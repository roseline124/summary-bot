import { Injectable } from '@nestjs/common';
import { SummaryService } from './modules/summary/summary.service';
import { TranslateService } from './modules/translate/translate.service';

@Injectable()
export class AppSerivce {
  constructor(
    private readonly translateService: TranslateService,
    private readonly summaryService: SummaryService,
  ) {}
  async sendSummary(message: string) {
    const translatedMessage = await this.translateService.koToEn(message);
    const summary = await this.summaryService.summary(translatedMessage);
    return await this.translateService.enToKo(summary);
  }
}
