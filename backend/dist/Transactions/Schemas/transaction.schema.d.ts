import { Document, Types } from 'mongoose';
export declare enum TransactionType {
    DEPOSIT = "Deposit",
    SEND = "Send",
    SWAP = "Swap",
    REQUEST = "Request",
    WITHDRAW = "Withdraw"
}
export declare enum TransactionStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed"
}
export declare class Transaction extends Document {
    transactionId: string;
    type: TransactionType;
    currency: string;
    amount: number;
    wallet: Types.ObjectId;
    recipient?: string;
    sender?: string;
    exchangeUsed?: string;
    fee?: number;
    status?: TransactionStatus;
}
export declare const TransactionSchema: import("mongoose").Schema<Transaction, import("mongoose").Model<Transaction, any, any, any, Document<unknown, any, Transaction> & Transaction & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Transaction, Document<unknown, {}, import("mongoose").FlatRecord<Transaction>> & import("mongoose").FlatRecord<Transaction> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
