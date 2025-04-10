import { Document } from 'mongoose';
import { Currency } from './currency.schema';
export declare class Market extends Document {
    listOfAvailableCurrencies: Currency[];
}
export declare const MarketSchema: import("mongoose").Schema<Market, import("mongoose").Model<Market, any, any, any, Document<unknown, any, Market> & Market & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Market, Document<unknown, {}, import("mongoose").FlatRecord<Market>> & import("mongoose").FlatRecord<Market> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
