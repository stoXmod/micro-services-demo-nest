import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { OrderService } from './order.service';
import { OrderDto } from './dtos/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('place-order')
  async placeOrder(
    @Body() orderData: OrderDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.orderService.placeOrder(orderData);
      res.status(200).json({ message: 'Order placed successfully' });
    } catch (ex) {
      res.status(400).json({ message: `Error Placing Order: ${ex}` });
    }
  }
}
