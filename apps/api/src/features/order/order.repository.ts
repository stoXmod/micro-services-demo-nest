// order.repository.ts
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.model';
import { AbstractRepository } from '../../database/abstract.repository';

@Injectable()
export class OrderRepository extends AbstractRepository<Order> {
  protected readonly logger: Logger;
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {
    super(orderModel);
  }
}
