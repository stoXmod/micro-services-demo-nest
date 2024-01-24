import { Module } from '@nestjs/common';
import { KafkaModule } from '../../kafka/kafka.module';
import { DatabaseModule } from '../../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { OrderService } from './order.service';
import { OrderConsumer } from './order.consumer';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.model';

@Module({
  imports: [
    KafkaModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderConsumer, OrderRepository],
})
export class OrderModule {}
