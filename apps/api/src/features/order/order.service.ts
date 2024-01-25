import { Injectable, Logger } from '@nestjs/common';
import { ProducerService } from '../../kafka/producer.service';
import { OrderRepository } from './order.repository';
import { OrderDto } from './dtos/order.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly producerService: ProducerService,
    private readonly orderRepository: OrderRepository,
  ) {}

  async placeOrder(orderData: OrderDto): Promise<void> {
    console.log('☘️ Order Received', orderData);
    // Save the order to MongoDB using the repository
    const createdOrder = await this.orderRepository.create<OrderDto>(orderData);
    // Send order placed event to Kafka
    await this.producerService.produce('order_place', {
      value: JSON.stringify(createdOrder),
    });
  }
}
