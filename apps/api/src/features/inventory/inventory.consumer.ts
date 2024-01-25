import { Injectable } from '@nestjs/common';
import { ConsumerService } from '../../kafka/consumer.service';

@Injectable()
export class OrderConsumer {
  constructor(private readonly kafkaConsumerService: ConsumerService) {}

  async onModuleInit() {
    console.log('order consumer initialized');
    await this.kafkaConsumerService.consume({
      topic: { topic: 'order_events' },
      config: { groupId: 'test-consumer' },
      onMessage: async (message) => {
        const orderPlacedEvent = JSON.parse(message.value.toString());
        console.log('✌️ Order Received to Kafka', orderPlacedEvent);
        // TO-DO: Deduct the order quantity from the inventory
      },
    });
  }
}
