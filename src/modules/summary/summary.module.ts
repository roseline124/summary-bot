import { Module } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI } from './constants';
import { SummaryController } from './summary.controller';
import { SlackMessageService } from './slack-message.service';
import { SummaryService } from './summary.service';

@Module({
  controllers: [SummaryController],
  providers: [
    SlackMessageService,
    SummaryService,
    {
      provide: OPENAI,
      useFactory: () => {
        return new OpenAIApi(
          new Configuration({ apiKey: process.env.OPENAI_API_KEY }),
        );
      },
    },
  ],
})
export class SummaryModule {}
