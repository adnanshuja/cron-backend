import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Connection, getManager, Repository } from 'typeorm';
import { CreateCronDto } from './dto/create-cron.dto';
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
    return this.cronRepository.find();
  }

  async startCronJob(id: number) {
    try{
      const foundCron = await this.cronRepository.findOne({ where: { id }});
      if(foundCron){
        if(!this.scheduleRegistry.doesExist("cron", foundCron.name)){
          const job = new CronJob(foundCron.cronString, async () => {
            this.logger.warn("running job ", foundCron.name);
            const result = await getManager().query(foundCron.cronQuery);
            console.log(result);
          });
          this.scheduleRegistry.addCronJob(foundCron.name, job);
          job.start();
          this.logger.warn("job started with name ",  foundCron.name);
        }
        foundCron.status = "running";
        return await foundCron.save();
      }
      throw new NotFoundException({ message: "Job Not found"});
      } catch( error ){
        throw new HttpException({message: "error", error: error.message}, HttpStatus.BAD_REQUEST);
      }
  }

  async stopCronJob(id: number) {
    try{
    const foundCron = await this.cronRepository.findOne({ where: { id }});
    if(foundCron){
      if(this.scheduleRegistry.doesExist("cron", foundCron.name)){
        const job = this.scheduleRegistry.getCronJob(foundCron.name);
        job.stop();
        this.logger.warn('stopping job');
        this.scheduleRegistry.deleteCronJob(foundCron.name);
      }
      foundCron.status = "stopped";
      return await foundCron.save();
    }
    throw new NotFoundException({ message: "Job Not found"});
    } catch( error ){
      throw new HttpException({message: "error", error: error.message}, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return this.cronRepository.delete(id);
  }
}
