import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Wallet extends Document {
  @Prop({ unique: true, required: true })
  wAddress: string;

  @Prop({ type: Map, of: Number, default: {} })
  listOfCurrencies: Map<string, number>;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Transaction' }], default: [] })
  transactions: Types.ObjectId[];

  @Prop({ type: String, required: true, unique: true })
  recoveryPhrases: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  walletType: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);