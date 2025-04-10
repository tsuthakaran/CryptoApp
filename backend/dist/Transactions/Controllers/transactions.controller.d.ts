import { TransactionService } from '../Services/transactions.service';
import { Model } from 'mongoose';
import { Wallet } from '../../Wallet/Schemas/wallet.schema';
import { Transaction } from '../Schemas/transaction.schema';
import { CreateTransactionDto } from '../Dtos/create-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    private readonly walletModel;
    constructor(transactionService: TransactionService, walletModel: Model<Wallet>);
    createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    respondToRequest(id: string, responseDto: {
        approved: boolean;
    }): Promise<Transaction>;
    getTransactionsFromUser(): Promise<Transaction[]>;
    getTransactionById(id: string): Promise<import("mongoose").Document<unknown, {}, Transaction> & Transaction & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getTransactionsByWallet(wAddress: string): Promise<import("mongoose").Types.ObjectId[]>;
}
