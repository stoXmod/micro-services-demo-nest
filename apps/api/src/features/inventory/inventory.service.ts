import { Injectable } from '@nestjs/common';
import { ConsumerService } from '../../kafka/consumer.service';
import { InventoryRepository } from './inventory.repository';

@Injectable()
export class InventoryService {
  constructor(
    private readonly kafkaConsumerService: ConsumerService,
    private readonly inventoryRepository: InventoryRepository,
  ) {
    this.subscribeToOrderEvents();
  }

  private subscribeToOrderEvents() {
    this.kafkaConsumerService.consume({
      topic: { topic: 'order_events' },
      config: { groupId: 'order-consumer' },
      onMessage: async (message) => {
        const orderEvent = JSON.parse(message.value.toString());
        // update inventory based on the order
        await this.handleOrderEvent(orderEvent);
      },
    });
  }

  private async handleOrderEvent(orderEvent: any): Promise<void> {
    const { productId, quantity } = orderEvent;
    await this.updateInventory(productId, quantity);
  }

  private async updateInventory(
    productId: string,
    quantity: number,
  ): Promise<void> {
    // Update the inventory in the database
    await this.inventoryRepository.findOneAndUpdate(
      { productId },
      { $inc: { quantity } },
      { new: true, upsert: true },
    );
  }
}
