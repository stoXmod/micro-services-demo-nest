import { Body, Controller, Get, Patch, Post, Res } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ProductDto } from './dtos/product.dto';
import { Response } from 'express';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('add-product')
  async addProduct(
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

  @Get()
  async getAllProducts(@Res() res: Response): Promise<void> {
    try {
      const products = await this.inventoryService.getAllProducts();
      res
        .status(200)
        .json({ message: 'Product fetched successfully', result: products });
    } catch (ex) {
      res.status(400).json({ message: `Error adding product: ${ex}` });
    }
  }

  @Post('delete-product')
  async deleteProduct(
    @Body() productData: Omit<ProductDto, 'name' | 'quantity'>,
    @Res() res: Response,
  ): Promise<void> {
    try {
      if (!productData.productId) throw new Error('Product Id is required');
      await this.inventoryService.deleteProduct(productData.productId);
      res.status(200).json({ message: 'Product added successfully' });
    } catch (ex) {
      res.status(400).json({ message: `Error adding product: ${ex}` });
    }
  }

  @Patch('update-product')
  async updateProduct(
    @Body() productData: Partial<ProductDto>,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.inventoryService.updateProduct(productData);
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (ex) {
      res.status(400).json({ message: `Error updating product: ${ex}` });
    }
  }
}
