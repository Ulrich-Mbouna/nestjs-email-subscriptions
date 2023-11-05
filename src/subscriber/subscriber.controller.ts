import { Controller } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import {
  Ctx,
  MessagePattern,
  RmqContext,
  Payload,
} from '@nestjs/microservices';

@Controller('subscribers')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  // @MessagePattern({ cmd: 'add-subscriber' })
  @MessagePattern({ cmd: 'add-subscriber' })
  addSubscriber(
    @Payload() subscriber: CreateSubscriberDto,
    @Ctx() context: RmqContext,
  ) {
    const newSubscriber = this.subscriberService.addSubscriber(subscriber);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);

    return newSubscriber;
  }

  @MessagePattern({ cmd: 'get-all-subscribers' })
  getAllSubscribers() {
    return this.subscriberService.getAllSubscribers();
  }
}
