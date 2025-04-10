import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Currency, CurrencySchema } from './currency.schema'

@Schema({ timestamps: true })
export class Market extends Document {
    @Prop({ type: [CurrencySchema], default: [] })
    listOfAvailableCurrencies: Currency[];
}

export const MarketSchema = SchemaFactory.createForClass(Market);
