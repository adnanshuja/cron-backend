import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Connection, getManager, Repository } from 'typeorm';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';
import { validate } from "mysql-query-validator";
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from './entities/cron.entity';

@Injectable()
export class CronService {

  constructor(
    @InjectRepository(Cron) private cronRepository: Repository<Cron>,
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
        this.logger.warn("running job ", name);
        const result = await getManager().query(cronQuery);
        console.log(result);
      });
      this.scheduleRegistry.addCronJob(name, job);
      job.start();
      const addedCronJob = this.cronRepository.create(createCronDto);
      addedCronJob.status = 'running';
      return await addedCronJob.save();
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
    return this.cronRepository.findAndCount();
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
