import { Document, Types } from 'mongoose';
export declare class CustomerSupport {
    name: string;
    email: string;
    starRating: number;
    feedbackText: string;
}
export declare const CustomerSupportSchema: import("mongoose").Schema<CustomerSupport, import("mongoose").Model<CustomerSupport, any, any, any, Document<unknown, any, CustomerSupport> & CustomerSupport & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CustomerSupport, Document<unknown, {}, import("mongoose").FlatRecord<CustomerSupport>> & import("mongoose").FlatRecord<CustomerSupport> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class SupportThread extends Document {
    messages: Types.DocumentArray<CustomerSupport>;
}
export declare const SupportThreadSchema: import("mongoose").Schema<SupportThread, import("mongoose").Model<SupportThread, any, any, any, Document<unknown, any, SupportThread> & SupportThread & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SupportThread, Document<unknown, {}, import("mongoose").FlatRecord<SupportThread>> & import("mongoose").FlatRecord<SupportThread> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
