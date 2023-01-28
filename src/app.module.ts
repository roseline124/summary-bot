import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppSerivce } from './app.service';
import { SummaryModule } from './modules/summary/summary.module';
import { TranslateModule } from './modules/translate/translate.module';

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true }),
    SummaryModule,
    TranslateModule,
  ],
  controllers: [AppController],
  providers: [AppSerivce],
})
export class AppModule {}
