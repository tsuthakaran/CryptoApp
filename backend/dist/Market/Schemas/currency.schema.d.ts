export declare class Currency {
    symbol: string;
    name: string;
    currency: string;
    value: number;
    change: number;
    icon: string;
}
export declare const CurrencySchema: import("mongoose").Schema<Currency, import("mongoose").Model<Currency, any, any, any, import("mongoose").Document<unknown, any, Currency> & Currency & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Currency, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Currency>> & import("mongoose").FlatRecord<Currency> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
