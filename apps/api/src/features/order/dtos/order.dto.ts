import { IsString, IsArray } from 'class-validator';

export class OrderDto {
  @IsString({ message: 'orderId must be a string' })
  orderId: string;

  @IsString({
    message: 'userId must be a string',
  })
  userId: string;

  @IsArray({
    message: 'products must be an array of strings',
  })
  products: number[];
}
