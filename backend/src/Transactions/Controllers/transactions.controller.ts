import { Controller, Get, Param, HttpException, HttpStatus, Post, Body, Patch } from '@nestjs/common';
import { TransactionService } from '../Services/transactions.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from '../../Wallet/Schemas/wallet.schema';
import { Transaction } from '../Schemas/transaction.schema';
import { CreateTransactionDto } from '../Dtos/create-transaction.dto';
@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
  ){}

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Patch(':id/respond')
  respondToRequest(@Param('id') id: string, @Body() responseDto: { approved: boolean }) {
    return this.transactionService.respondToRequest(id, responseDto.approved);
  }

  @Get(':id/user')
  async getTransactionsFromUser() {
    return this.transactionService.getTransactions();
  }

  @Get(':id')
async getTransactionById(@Param('id') id: string) {
  try {
    const transaction = await this.transactionService.getTransactionById(id);

    if (!transaction) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }

    return transaction;
  } catch (error) {
    console.error(error);
    throw new HttpException('Failed to fetch transaction', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
  @Get('by-wallet/:wAddress')
  async getTransactionsByWallet(@Param('wAddress') wAddress: string) {
    try {
      // Find the wallet by its address and populate the transactions
      const wallet = await this.walletModel.findOne({ wAddress }).populate('transactions').exec();

      if (!wallet) {
        throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
      }

      return wallet.transactions;
    } catch (error) {
      throw new HttpException('Failed to fetch transactions', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    
  }
  
}
