import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          if (connection.readyState === 1) {
            console.log('🚀 Connected to MongoDB');
          }
          connection.on('error', (err) => {
            console.log('🔴 MongoDB connection error: ', err);
          });
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
