import { NestFactory } from '@nestjs/core';
import { ExpressReceiver } from '@slack/bolt';
import { AppModule } from './app.module';
import { EXPRESS_RECEIVER } from './core/slack/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const receiver = app.get<ExpressReceiver>(EXPRESS_RECEIVER);
  app.use('/', receiver.app);

  await app.listen(3000);
}
bootstrap();
