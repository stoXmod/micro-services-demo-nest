import { IsString, IsArray, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity: number;
}
