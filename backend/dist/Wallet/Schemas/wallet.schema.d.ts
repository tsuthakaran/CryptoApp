import { Document, Types } from 'mongoose';
export declare class Wallet extends Document {
    wAddress: string;
    listOfCurrencies: Map<string, number>;
    transactions: Types.ObjectId[];
    recoveryPhrases: string;
    email: string;
    password: string;
    walletType: string;
}
export declare const WalletSchema: import("mongoose").Schema<Wallet, import("mongoose").Model<Wallet, any, any, any, Document<unknown, any, Wallet> & Wallet & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Wallet, Document<unknown, {}, import("mongoose").FlatRecord<Wallet>> & import("mongoose").FlatRecord<Wallet> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
