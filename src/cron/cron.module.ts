import { Logger, Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Connection } from 'typeorm';
import { Cron } from './entities/cron.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cron])],
  controllers: [CronController],
  providers: [CronService, SchedulerRegistry, Logger]
})
export class CronModule {}
