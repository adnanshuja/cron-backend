import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Repository } from 'typeorm';
import { CreateGraphqlCronInput } from './dto/create-graphql-cron.input';
import { UpdateGraphqlCronInput } from './dto/update-graphql-cron.input';
import { GraphqlCron } from './entities/graphql-cron.entity';
import { SendEmailService } from './send-email.service';

@Injectable()
export class GraphqlCronService {

  constructor(
    @InjectRepository(GraphqlCron) private cronRepo: Repository<GraphqlCron>,
    private readonly sendEmailService: SendEmailService,
    private readonly scheduleRegistry: SchedulerRegistry
    ){}
  
  create(createGraphqlCronInput: CreateGraphqlCronInput) {
    return 'This action adds a new graphqlCron';
  }

  scheduleEmail(emailSchedule: any) {
    const date = new Date(emailSchedule.date);
    const job = new CronJob(date, () => {
      this.sendEmailService.sendMail({
        to: emailSchedule.recipient,
        subject: emailSchedule.subject,
        text: emailSchedule.content
      })
    });
 
    this.scheduleRegistry.addCronJob(`${Date.now()}-${emailSchedule.subject}`, job);
    job.start();
  }

  findAll() {
    return this.cronRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} graphqlCron`;
  }

  update(id: number, updateGraphqlCronInput: UpdateGraphqlCronInput) {
    return `This action updates a #${id} graphqlCron`;
  }

  remove(id: number) {
    return `This action removes a #${id} graphqlCron`;
  }
}
