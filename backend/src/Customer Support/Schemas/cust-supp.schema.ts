import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class CustomerSupport {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, default: 0, min: 1, max: 5 })
  starRating: number;

  @Prop({ required: true })
  feedbackText: string;
}

export const CustomerSupportSchema = SchemaFactory.createForClass(CustomerSupport);

@Schema({ timestamps: true })
export class SupportThread extends Document {
  @Prop({ type: [CustomerSupportSchema], default: [] })
  messages: Types.DocumentArray<CustomerSupport>;
}

export const SupportThreadSchema = SchemaFactory.createForClass(SupportThread);
