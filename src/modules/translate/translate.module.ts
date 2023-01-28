import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';

@Module({
  imports: [HttpModule],
  providers: [TranslateService],
  exports: [TranslateService],
})
export class TranslateModule {}
