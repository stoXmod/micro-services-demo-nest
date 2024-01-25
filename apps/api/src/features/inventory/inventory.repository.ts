// order.repository.ts
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { AbstractRepository } from '../../database/abstract.repository';

@Injectable()
export class InventoryRepository extends AbstractRepository<Product> {
  protected readonly logger: Logger;
  constructor(
    @InjectModel(Product.name) private readonly orderModel: Model<Product>,
  ) {
    super(orderModel);
  }
}
