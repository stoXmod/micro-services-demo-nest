import { Module } from '@nestjs/common';
import { KafkaModule } from '../../kafka/kafka.module';
import { DatabaseModule } from '../../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

@Module({
  imports: [
    KafkaModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class OrderModule {}
