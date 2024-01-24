import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { AbstractDocument } from '../../database/abstract.schema';

@Schema()
export class Order extends Document implements AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  orderId: string;

  @Prop()
  userId: string;

  @Prop()
  products: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
