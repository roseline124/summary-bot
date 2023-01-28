import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type LANGUAGE = 'ko' | 'en';

@Injectable()
export class TranslateService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async koToEn(message: string) {
    if (!/[ㄱ-ㅎ]|[가-힣]/g.test(message)) {
      return message;
    }

    await this.translate('ko', 'en', message);
  }

  async enToKo(message: string) {
    if (!/[a-z]/g.test(message)) {
      return message;
    }
    return await this.translate('en', 'ko', message);
  }

  private async translate(source: LANGUAGE, target: LANGUAGE, message: string) {
    const { data } = await this.httpService.axiosRef.post(
      'https://openapi.naver.com/v1/papago/n2mt',
      `source=${source}&target=${target}&text=${message.trim()}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Naver-Client-Id': this.configService.get('PAPAGO_CLIENT_ID'),
          'X-Naver-Client-Secret': this.configService.get(
            'PAPAGO_CLIENT_SECRET',
          ),
        },
      },
    );

    return data.message.result.translatedText;
  }
}
