import { Body, Controller, Post } from '@nestjs/common';
import { SlackMessageService } from './slack-message.service';

@Controller('/summary')
export class SummaryController {
  constructor(private readonly messageService: SlackMessageService) {}

  @Post()
  async sendSummary(@Body('message') message: string) {
    return await this.messageService.send(message);
  }
}
