import { Injectable } from '@nestjs/common';

@Injectable()
export class AppSerivce {
  async sendSummary(message: string) {
    return message;
  }
}
