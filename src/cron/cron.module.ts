import { Logger, Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { SchedulerRegistry } from '@nestjs/schedule';

@Module({
  controllers: [CronController],
  providers: [CronService, SchedulerRegistry, Logger]
})
export class CronModule {}
