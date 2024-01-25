import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  productId: string;

  @Prop()
  name: string;

  @Prop()
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
