import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CronService } from './cron.service';
import { CreateCronDto } from './dto/create-cron.dto';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Post('/create')
  create(@Body() createCronDto: CreateCronDto) {
    return this.cronService.createCronJob(createCronDto);
  }

  @Get('/list-all')
  findAll() {
    return this.cronService.findAll();
  }

  @Patch('/start-job/:id')
  async startCronJob(@Param('id') id: string) {
    return await this.cronService.startCronJob(+id);
  }

  @Patch('/stop-job/:id')
  async update(@Param('id') id: string) {
    console.log('id', id)
    return await this.cronService.stopCronJob(+id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.cronService.remove(+id);
  }
}
