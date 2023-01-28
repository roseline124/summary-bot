import { Module } from '@nestjs/common';
import { SlackModule } from 'src/core/slack/slack.module';
import { SummaryModule } from '../summary/summary.module';
import { TranslateModule } from '../translate/translate.module';
import { SlackHandlerService } from './slack-handler.service';

@Module({
  imports: [SlackModule, TranslateModule, SummaryModule],
  providers: [SlackHandlerService],
  exports: [SlackHandlerService],
})
export class SlackHandlerModule {}
