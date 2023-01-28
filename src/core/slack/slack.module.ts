import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App as SlackApp, ExpressReceiver } from '@slack/bolt';
import { SLACK_APP, EXPRESS_RECEIVER } from './constants';

@Module({
  providers: [
    {
      provide: EXPRESS_RECEIVER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new ExpressReceiver({
          signingSecret: configService.get('SLACK_SIGNING_SECRET'),
          scopes: ['chat:write', 'chat:write.public', 'reaction_added'],
        });
      },
    },
    {
      provide: SLACK_APP,
      inject: [ConfigService, EXPRESS_RECEIVER],
      useFactory: (
        configService: ConfigService,
        expressReceiver: ExpressReceiver,
      ) => {
        return new SlackApp({
          token: configService.get('SLACK_BOT_TOKEN'),
          receiver: expressReceiver,
        });
      },
    },
  ],
  exports: [EXPRESS_RECEIVER, SLACK_APP],
})
export class SlackModule {}
