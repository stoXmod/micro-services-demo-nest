import { Injectable, Logger } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly producerService: ProducerService) {}

  async getHello() {
    try {
      this.logger.log('Sending message to Kafka');
      console.log('Sending message to kafka...');
      await this.producerService.produce('test', { value: 'Hello World' });
      this.logger.log('Message sent successfully');
      console.log('Message sent successfully');
    } catch (error) {
      this.logger.error('Failed to send message to Kafka', error);
      // Handle the error appropriately
    }
    return 'Hello World!';
  }
}
