import { Module } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI } from './constants';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
  controllers: [SummaryController],
  providers: [
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
