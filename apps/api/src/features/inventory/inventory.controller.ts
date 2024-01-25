import { Body, Controller, Post, Res } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ProductDto } from './dtos/product.dto';
import { Response } from 'express';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('add-product')
  async placeOrder(
    @Body() productData: ProductDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.inventoryService.addProduct(productData);
      res.status(200).json({ message: 'Product added successfully' });
    } catch (ex) {
      res.status(400).json({ message: `Error adding product: ${ex}` });
    }
  }
}
