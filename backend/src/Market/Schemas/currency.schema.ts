import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Currency {
  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  change: number;

  @Prop({ required: true })
  icon: string;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);