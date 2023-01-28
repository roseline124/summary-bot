import { Injectable } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Injectable()
export class SlackMessageService {
  constructor(private readonly summaryService: SummaryService) {}

  async send(message: string) {
    const summary = await this.summaryService.summary(message);
    /**
     * @TODO send to slack 구현
     */
    return summary;
  }
}
