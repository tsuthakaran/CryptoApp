"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_schema_1 = require("../Schemas/transaction.schema");
const mongoose_3 = require("mongoose");
const wallet_schema_1 = require("../../Wallet/Schemas/wallet.schema");
let TransactionService = class TransactionService {
    transactionModel;
    walletModel;
    constructor(transactionModel, walletModel) {
        this.transactionModel = transactionModel;
        this.walletModel = walletModel;
    }
    handlers = {
        [transaction_schema_1.TransactionType.DEPOSIT]: this.handleDeposit.bind(this),
        [transaction_schema_1.TransactionType.SEND]: this.handleSend.bind(this),
        [transaction_schema_1.TransactionType.SWAP]: this.handleSwap.bind(this),
        [transaction_schema_1.TransactionType.REQUEST]: this.handleRequest.bind(this),
        [transaction_schema_1.TransactionType.WITHDRAW]: this.handleWithdraw.bind(this),
    };
    async createTransaction(dto) {
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
    async handleDeposit(dto) {
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
        targetWallet.transactions.push(newTransaction._id);
        await targetWallet.save();
        return newTransaction;
    }
    async handleSend(dto) {
        const { wallet: senderId, recipient: recipientAddress, currency, amount } = dto;
        const senderWallet = await this.walletModel.findById(senderId);
        if (!senderWallet)
            throw new Error('Sender wallet not found.');
        const recipientWallet = await this.walletModel.findOne({ wAddress: recipientAddress });
        if (!recipientWallet)
            throw new Error('Recipient wallet not found.');
        const senderBalance = senderWallet.listOfCurrencies.get(currency) || 0;
        if (senderBalance < amount)
            throw new Error('Insufficient balance.');
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
        senderWallet.transactions.push(transaction._id);
        recipientWallet.transactions.push(transaction._id);
        await senderWallet.save();
        await recipientWallet.save();
        return transaction;
    }
    async handleSwap(dto) {
        const { wallet: walletId, currency: fromCurrency, amount, recipient: toCurrency, fee = 0 } = dto;
        if (!toCurrency) {
            throw new Error('Missing target currency (recipient field is used for swap target).');
        }
        const wallet = await this.walletModel.findById(walletId);
        if (!wallet)
            throw new Error('Wallet not found.');
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
        wallet.transactions.push(transaction._id);
        await wallet.save();
        return transaction;
    }
    async handleRequest(dto) {
        const { wallet: requesterId, recipient, currency, amount } = dto;
        if (!recipient) {
            throw new Error('Recipient wallet address is required to send a request.');
        }
        const requesterWallet = await this.walletModel.findById(requesterId);
        if (!requesterWallet)
            throw new Error('Requester wallet not found.');
        const recipientWallet = await this.walletModel.findOne({ wAddress: recipient });
        if (!recipientWallet)
            throw new Error('Recipient wallet not found.');
        const transactionId = `tx_${Date.now()}`;
        const transaction = await this.transactionModel.create({
            ...dto,
            transactionId,
            status: transaction_schema_1.TransactionStatus.PENDING,
        });
        requesterWallet.transactions.push(transaction._id);
        await requesterWallet.save();
        return transaction;
    }
    async respondToRequest(id, approved) {
        const transaction = await this.transactionModel.findById(id);
        if (!transaction)
            throw new Error('Transaction not found.');
        if (transaction.type !== transaction_schema_1.TransactionType.REQUEST) {
            throw new Error('This transaction is not a request.');
        }
        if (transaction.status !== transaction_schema_1.TransactionStatus.PENDING) {
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
            transaction.status = transaction_schema_1.TransactionStatus.COMPLETED;
            await senderWallet.save();
            await requesterWallet.save();
        }
        else {
            transaction.status = transaction_schema_1.TransactionStatus.FAILED;
        }
        await transaction.save();
        return transaction;
    }
    async handleWithdraw(dto) {
        const { wallet, currency, amount } = dto;
        const targetWallet = await this.walletModel.findById(wallet);
        if (!targetWallet)
            throw new Error('Wallet not found.');
        const currentAmount = targetWallet.listOfCurrencies.get(currency) || 0;
        if (currentAmount < amount)
            throw new Error('Insufficient balance.');
        targetWallet.listOfCurrencies.set(currency, currentAmount - amount);
        await targetWallet.save();
        const transactionId = `tx_${Date.now()}`;
        const transaction = await this.transactionModel.create({
            ...dto,
            transactionId,
        });
        targetWallet.transactions.push(transaction._id);
        await targetWallet.save();
        return transaction;
    }
    async getTransactions() {
        return this.transactionModel.find().populate('wallet').exec();
    }
    async getTransactionById(id) {
        return await this.transactionModel.findById(id).exec();
    }
    async updateTransactionStatus(id, status) {
        const transaction = await this.transactionModel.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).exec();
        if (!transaction) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        }
        return transaction;
    }
    async resolveWalletId(walletField) {
        if ((0, mongoose_3.isValidObjectId)(walletField)) {
            return new mongoose_2.Types.ObjectId(walletField);
        }
        const walletDoc = await this.walletModel.findOne({ wAddress: walletField });
        if (!walletDoc) {
            throw new Error('Wallet not found using provided wallet ID or address.');
        }
        return walletDoc._id;
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __param(1, (0, mongoose_1.InjectModel)(wallet_schema_1.Wallet.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TransactionService);
//# sourceMappingURL=transactions.service.js.map