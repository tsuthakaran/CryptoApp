import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum TransactionType {
  DEPOSIT = 'Deposit',
  SEND = 'Send',
  SWAP = 'Swap',
  REQUEST = 'Request',
  WITHDRAW = 'Withdraw',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ required: true, unique: true })
  transactionId: string;

  @Prop({ required: true, enum: TransactionType }) 
  type: TransactionType;

  @Prop({ required: true }) 
  currency: string;

  @Prop({ required: true }) 
  amount: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Wallet' }) 
  wallet: Types.ObjectId;

  @Prop({ type: String, default: null }) 
  recipient?: string;

  @Prop({ type: String, default: null }) 
  sender?: string;

  @Prop({ type: String, default: null }) 
  exchangeUsed?: string; // For buy, sell, or swaps (e.g., Binance, Uniswap)

  @Prop({ type: Number, default: 0 }) 
  fee?: number;

  @Prop({ type: String, enum: TransactionStatus, default: TransactionStatus.PENDING }) 
  status?: TransactionStatus;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
