import { Controller } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // @Post('add-order')
  // async placeOrder(
  //   @Body() orderData: OrderDto,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   try {
  //     await this.orderService.placeOrder(orderData);
  //     res.status(200).json({ message: 'Order placed successfully' });
  //   } catch (ex) {
  //     res.status(400).json({ message: `Error Placing Order: ${ex}` });
  //   }
  // }
}
