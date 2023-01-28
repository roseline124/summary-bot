import { Inject, Injectable } from '@nestjs/common';
import { OpenAIApi } from 'openai';
import { OPENAI } from './constants';

@Injectable()
export class SummaryService {
  constructor(@Inject(OPENAI) private readonly openai: OpenAIApi) {}

  async summary(message: string) {
    const prompt = this.extractPrompt(message);
    return await this.ask(prompt);
  }

  private extractPrompt(message: string): string {
    const urlMatches = message.match(
      /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/,
    );
    return urlMatches?.[0] ?? message.slice(0, 256); // prompt도 토큰으로 치기 때문에 글자를 자른다.
  }

  private async ask(prompt: string) {
    const { data } = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `summary this article.\n ${prompt}`,
      temperature: 0.2, // 온도를 높일 수록 랜덤성이 올라간다
      // max_tokens: 128, // test할 때는 주석처리할 것
    });

    return data.choices?.[0]?.text;
  }
}
