import { Module } from '@nestjs/common';
import { SummaryModule } from './modules/summary/summary.module';

@Module({
  imports: [SummaryModule],
})
export class AppModule {}
