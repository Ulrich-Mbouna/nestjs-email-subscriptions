import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SubscriberModule } from './subscriber/subscriber.module';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module.js';
import { Subscriber } from './subscriber/entities/subscriber.entity';
import { SubscriberController } from './subscriber/subscriber.controller';
import { SubscriberService } from './subscriber/subscriber.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscriber]),
    SubscriberModule,
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        HOST: Joi.string().required(),
      }),
    }),
  ],
  controllers: [SubscriberController],
  providers: [AppService, SubscriberService],
})
export class AppModule {}
