import { Controller } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { Subscriber } from './entities/subscriber.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private subscribersRepository: Repository<Subscriber>,
  ) {}

  @GrpcMethod()
  async addSubscriber(subscriber: CreateSubscriberDto) {
    const newSubscriber = this.subscribersRepository.create(subscriber);
    await this.subscribersRepository.save(newSubscriber);

    return newSubscriber;
  }

  @GrpcMethod()
  async getAllSubscriber() {
    const data = await this.subscribersRepository.find();

    return { data };
  }
}
