import { TransactionType, TransactionStatus } from '../Schemas/transaction.schema';
export declare class CreateTransactionDto {
    type: TransactionType;
    currency: string;
    amount: number;
    wallet: string;
    recipient?: string;
    sender?: string;
    exchangeUsed?: string;
    status?: TransactionStatus;
    fee?: number;
    transactionId: string;
}
