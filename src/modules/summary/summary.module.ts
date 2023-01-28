import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI } from './constants';
import { SummaryService } from './summary.service';

@Module({
  providers: [
    SummaryService,
    {
      provide: OPENAI,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get('OPENAI_API_KEY');
        return new OpenAIApi(new Configuration({ apiKey }));
      },
    },
  ],
  exports: [SummaryService],
})
export class SummaryModule {}
