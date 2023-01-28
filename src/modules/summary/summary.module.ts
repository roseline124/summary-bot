import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { TranslateModule } from '../translate/translate.module';
import { OPENAI } from './constants';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
  imports: [TranslateModule],
  controllers: [SummaryController],
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
})
export class SummaryModule {}
