import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Connection, getManager } from 'typeorm';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';
import { validate } from "mysql-query-validator";

@Injectable()
export class CronService {

  constructor(
    private scheduleRegistry: SchedulerRegistry,
    private logger: Logger,
    private connection: Connection) { }

  async createCronJob(createCronDto: CreateCronDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { name, cronString, cronQuery } = createCronDto;
      validate(cronQuery);
      await queryRunner.query(cronQuery);
      await queryRunner.rollbackTransaction();
      const job = new CronJob(cronString, async () => {
        await getManager().query(cronQuery);
        this.logger.warn("running job ", name);
      });
      this.scheduleRegistry.addCronJob(name, job);
      job.start();
    } catch (error) {
      if (error.message.includes('syntax error')) {
        throw new BadRequestException({ status: HttpStatus.BAD_REQUEST, message: "Querry Error", error: error.message });
      }
      if (error.sqlMessage) {
        await queryRunner.rollbackTransaction();
        throw new BadRequestException({ status: HttpStatus.BAD_REQUEST, message: "Querry Error", error: error.sqlMessage });
      }
      throw new HttpException({ message: "error", error: error.message }, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
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
