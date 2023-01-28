import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { App as SlackApp } from '@slack/bolt';
import { SLACK_APP } from 'src/core/slack/constants';
import { SummaryService } from '../summary/summary.service';
import { TranslateService } from '../translate/translate.service';

/**
 * https://www.npmjs.com/package/nestjs-slack-listener/v/1.0.3
 * 처럼 메타데이터 스캐너로 볼트랑 연동해서 핸들러 리스너 만들어도 될 듯 -> 슬랙봇 쉽게 만들게
 */

@Injectable()
export class SlackHandlerService implements OnModuleInit {
  constructor(
    @Inject(SLACK_APP) private readonly slackApp: SlackApp,
    private readonly translateService: TranslateService,
    private readonly summaryService: SummaryService,
  ) {}
  onModuleInit() {
    this.slackApp.event('reaction_added', async ({ event, ack, client }) => {
      if (ack) {
        await (ack as any)();
      }

      if (event.reaction !== 'robot_face') {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const item_ts = event.item.ts;
      const { messages } = await client.conversations.history({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        latest: item_ts,
        inclusive: true,
        channel: event.item.channel,
        limit: 1,
      });
      const message = messages[0]?.text;

      const summary = await this.getSummary(message);
      await client.chat.postMessage({
        text: summary,
        thread_ts: item_ts,
        channel: event.item.channel,
      });
    });
  }

  async getSummary(message: string) {
    const translatedMessage = await this.translateService.koToEn(message);
    const summary = await this.summaryService.summary(translatedMessage);
    return await this.translateService.enToKo(summary);
  }
}
