import { Injectable } from '@nestjs/common';
import { ConsumerService } from '../../kafka/consumer.service';
import { InventoryRepository } from './inventory.repository';
import { ProductDto } from './dtos/product.dto';

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
      topic: { topic: 'order_place' },
      config: { groupId: 'order-consumer' },
      onMessage: async (message) => {
        const orderEvent = JSON.parse(message.value.toString());
        console.log('✌️ Order Received to Kafka', orderEvent);
        // update inventory based on the order
        await this.handleOrderEvent(orderEvent);
      },
    });
  }

  private async handleOrderEvent(orderEvent: {
    orderId: string;
    userId: string;
    products: string[];
  }): Promise<void> {
    const { products } = orderEvent;
    await this.updateInventory(products);
  }

  private async updateInventory(products: string[]): Promise<void> {
    // Update the inventory for each product
    for (const product of products) {
      await this.inventoryRepository.findOneAndUpdate(
        { productId: product },
        { $inc: { quantity: -1 } },
        { new: true, upsert: true },
      );
    }
  }

  async addProduct(productData: ProductDto): Promise<void> {
    await this.inventoryRepository.create<ProductDto>(productData);
  }

  async getAllProducts(): Promise<ProductDto[]> {
    return await this.inventoryRepository.find({});
  }

  //   delete product
  async deleteProduct(productId: string): Promise<void> {
    await this.inventoryRepository.deleteOne({ productId });
  }

  async updateProduct(productData: Partial<ProductDto>): Promise<void> {
    await this.inventoryRepository.findOneAndUpdate(
      { productId: productData.productId },
      { $set: productData },
      { new: true, upsert: true },
    );
  }
}
