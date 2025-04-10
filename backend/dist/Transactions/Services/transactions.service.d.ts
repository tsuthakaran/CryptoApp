import { Model } from 'mongoose';
import { Transaction, TransactionStatus } from '../Schemas/transaction.schema';
import { CreateTransactionDto } from '../Dtos/create-transaction.dto';
import { Wallet } from 'src/Wallet/Schemas/wallet.schema';
export declare class TransactionService {
    private transactionModel;
    private walletModel;
    constructor(transactionModel: Model<Transaction>, walletModel: Model<Wallet>);
    private readonly handlers;
    createTransaction(dto: CreateTransactionDto): Promise<Transaction>;
    private handleDeposit;
    private handleSend;
    private handleSwap;
    private handleRequest;
    respondToRequest(id: string, approved: boolean): Promise<Transaction>;
    private handleWithdraw;
    getTransactions(): Promise<Transaction[]>;
    getTransactionById(id: string): Promise<(import("mongoose").Document<unknown, {}, Transaction> & Transaction & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    updateTransactionStatus(id: string, status: TransactionStatus): Promise<Transaction>;
    private resolveWalletId;
}
