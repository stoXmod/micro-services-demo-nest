import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './features/order/order.module';
import { InventoryModule } from './features/inventory/inventory.module';

@Module({
  imports: [
    KafkaModule,
    DatabaseModule,
    OrderModule,
    InventoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
