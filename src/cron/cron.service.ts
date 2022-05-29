import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';

@Injectable()
export class CronService {

  constructor(private scheduleRegistry: SchedulerRegistry, private logger: Logger) {}

  createCronJob(createCronDto: CreateCronDto) {
    const { name, cronString } = createCronDto;
   const job = new CronJob(cronString, () => {
     this.logger.warn("running job " , name);
   }); 

    this.scheduleRegistry.addCronJob(name, job);
    job.start();
  }

  findAll() {
    return `This action returns all cron`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cron`;
  }

  update(id: number, updateCronDto: UpdateCronDto) {
    return `This action updates a #${id} cron`;
  }

  remove(id: number) {
    return `This action removes a #${id} cron`;
  }
}
