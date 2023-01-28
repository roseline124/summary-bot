import { Body, Controller, Post } from '@nestjs/common';
import { AppSerivce } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppSerivce) {}

  @Post('/summary')
  async summary(@Body('message') message: string) {
    return await this.appService.sendSummary(message);
  }
}
