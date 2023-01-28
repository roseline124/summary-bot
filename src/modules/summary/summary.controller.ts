import { Body, Controller, Post } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('/summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  async summary(@Body('message') message: string) {
    return await this.summaryService.summary(message);
  }
}
