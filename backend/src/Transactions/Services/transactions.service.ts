import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction, TransactionType, TransactionStatus } from '../Schemas/transaction.schema';
import { CreateTransactionDto } from '../Dtos/create-transaction.dto';
import { isValidObjectId } from 'mongoose';

import { Wallet } from 'src/Wallet/Schemas/wallet.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(Wallet.name) private walletModel: Model<Wallet>,
  ) {}

  private readonly handlers = {
    [TransactionType.DEPOSIT]: this.handleDeposit.bind(this),
    [TransactionType.SEND]: this.handleSend.bind(this),
    [TransactionType.SWAP]: this.handleSwap.bind(this),
    [TransactionType.REQUEST]: this.handleRequest.bind(this),
    [TransactionType.WITHDRAW]: this.handleWithdraw.bind(this),
  };


  async createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
    const walletId = await this.resolveWalletId(dto.wallet);
  
    const normalizedDto = {
      ...dto,
      wallet: walletId,
    };
  
    const handler = this.handlers[normalizedDto.type];
    if (!handler) {
      throw new Error(`Unsupported transaction type: ${normalizedDto.type}`);
    }
  
    return handler(normalizedDto);
  }
  

  private async handleDeposit(dto: CreateTransactionDto): Promise<Transaction> {
    const { wallet, currency, amount } = dto;

    const targetWallet = await this.walletModel.findById(wallet);

    if (!targetWallet) {
      throw new Error('Wallet not found.');
    }

    const currentAmount = targetWallet.listOfCurrencies.get(currency) || 0;
    targetWallet.listOfCurrencies.set(currency, currentAmount + amount);

    await targetWallet.save();

    const transactionId = `tx_${Date.now()}`;

    const newTransaction = await this.transactionModel.create({
      ...dto,
      transactionId,
    });

    targetWallet.transactions.push(newTransaction._id as Types.ObjectId);
    await targetWallet.save();

    return newTransaction;
  }

  private async handleSend(dto: CreateTransactionDto): Promise<Transaction> {
    const { wallet: senderId, recipient: recipientAddress, currency, amount } = dto;

    const senderWallet = await this.walletModel.findById(senderId);
    if (!senderWallet) throw new Error('Sender wallet not found.');

    const recipientWallet = await this.walletModel.findOne({ wAddress: recipientAddress });
    if (!recipientWallet) throw new Error('Recipient wallet not found.');

    const senderBalance = senderWallet.listOfCurrencies.get(currency) || 0;
    if (senderBalance < amount) throw new Error('Insufficient balance.');

    senderWallet.listOfCurrencies.set(currency, senderBalance - amount);

    const recipientBalance = recipientWallet.listOfCurrencies.get(currency) || 0;
    recipientWallet.listOfCurrencies.set(currency, recipientBalance + amount);

    await senderWallet.save();
    await recipientWallet.save();

    const transactionId = `tx_${Date.now()}`;
    const transaction = await this.transactionModel.create({
      ...dto,
      transactionId,
    });

    senderWallet.transactions.push(transaction._id as Types.ObjectId);
    recipientWallet.transactions.push(transaction._id as Types.ObjectId);
    await senderWallet.save();
    await recipientWallet.save();

    return transaction;
  }

  private async handleSwap(dto: CreateTransactionDto): Promise<Transaction> {
    const { wallet: walletId, currency: fromCurrency, amount, recipient: toCurrency, fee = 0 } = dto;
  
    if (!toCurrency) {
      throw new Error('Missing target currency (recipient field is used for swap target).');
    }
  
    const wallet = await this.walletModel.findById(walletId);
    if (!wallet) throw new Error('Wallet not found.');
  
    const fromBalance = wallet.listOfCurrencies.get(fromCurrency) || 0;
    if (fromBalance < amount + fee) {
      throw new Error('Insufficient balance for swap + fee.');
    }
  
    const exchangeRate = 15; 
    const toAmount = amount * exchangeRate;

    wallet.listOfCurrencies.set(fromCurrency, fromBalance - amount - fee);
  
    const currentToBalance = wallet.listOfCurrencies.get(toCurrency) || 0;
    wallet.listOfCurrencies.set(toCurrency, currentToBalance + toAmount);
  
    await wallet.save();
  
    const transactionId = `tx_${Date.now()}`;
    const transaction = await this.transactionModel.create({
      ...dto,
      recipient: toCurrency,
      transactionId,
      fee,
    });
  
    wallet.transactions.push(transaction._id as Types.ObjectId);
    await wallet.save();
  
    return transaction;
  }
  

  private async handleRequest(dto: CreateTransactionDto): Promise<Transaction> {
    const { wallet: requesterId, recipient, currency, amount } = dto;
  
    if (!recipient) {
      throw new Error('Recipient wallet address is required to send a request.');
    }
  
    const requesterWallet = await this.walletModel.findById(requesterId);
    if (!requesterWallet) throw new Error('Requester wallet not found.');
  
    const recipientWallet = await this.walletModel.findOne({ wAddress: recipient });
    if (!recipientWallet) throw new Error('Recipient wallet not found.');
  
    const transactionId = `tx_${Date.now()}`;
    const transaction = await this.transactionModel.create({
      ...dto,
      transactionId,
      status: TransactionStatus.PENDING,
    });
  
    requesterWallet.transactions.push(transaction._id as Types.ObjectId);
    await requesterWallet.save();
  
    return transaction;
  }
  async respondToRequest(id: string, approved: boolean): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id);
    if (!transaction) throw new Error('Transaction not found.');
  
    if (transaction.type !== TransactionType.REQUEST) {
      throw new Error('This transaction is not a request.');
    }
  
    if (transaction.status !== TransactionStatus.PENDING) {
      throw new Error('This request has already been handled.');
    }
  
    const requesterWallet = await this.walletModel.findById(transaction.wallet);
    const senderWallet = await this.walletModel.findOne({ wAddress: transaction.recipient });
  
    if (!requesterWallet || !senderWallet) {
      throw new Error('Wallet(s) involved in this transaction could not be found.');
    }
  
    if (approved) {
      const senderBalance = senderWallet.listOfCurrencies.get(transaction.currency) || 0;
      if (senderBalance < transaction.amount) {
        throw new Error('Sender does not have enough balance.');
      }
  
      senderWallet.listOfCurrencies.set(transaction.currency, senderBalance - transaction.amount);
      const requesterBalance = requesterWallet.listOfCurrencies.get(transaction.currency) || 0;
      requesterWallet.listOfCurrencies.set(transaction.currency, requesterBalance + transaction.amount);
  
      transaction.status = TransactionStatus.COMPLETED;
  
      await senderWallet.save();
      await requesterWallet.save();
    } else {
      transaction.status = TransactionStatus.FAILED;
    }
  
    await transaction.save();
    return transaction;
  }
  
  private async handleWithdraw(dto: CreateTransactionDto): Promise<Transaction> {
    const { wallet, currency, amount } = dto;

    const targetWallet = await this.walletModel.findById(wallet);
    if (!targetWallet) throw new Error('Wallet not found.');

    const currentAmount = targetWallet.listOfCurrencies.get(currency) || 0;
    if (currentAmount < amount) throw new Error('Insufficient balance.');

    targetWallet.listOfCurrencies.set(currency, currentAmount - amount);
    await targetWallet.save();

    const transactionId = `tx_${Date.now()}`;
    const transaction = await this.transactionModel.create({
      ...dto,
      transactionId,
    });

    targetWallet.transactions.push(transaction._id as Types.ObjectId);
    await targetWallet.save();

    return transaction;
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.transactionModel.find().populate('wallet').exec();
  }

  async getTransactionById(id: string) {
    return await this.transactionModel.findById(id).exec();
  }

  async updateTransactionStatus(id: string, status: TransactionStatus): Promise<Transaction> {
    const transaction = await this.transactionModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    ).exec();

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  private async resolveWalletId(walletField: string): Promise<Types.ObjectId> {
    if (isValidObjectId(walletField)) {
      return new Types.ObjectId(walletField);
    }
  
    const walletDoc = await this.walletModel.findOne({ wAddress: walletField });
    if (!walletDoc) {
      throw new Error('Wallet not found using provided wallet ID or address.');
    }
  
    return walletDoc._id as Types.ObjectId;
  }
}
