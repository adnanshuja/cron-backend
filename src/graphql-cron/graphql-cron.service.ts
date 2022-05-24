import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGraphqlCronInput } from './dto/create-graphql-cron.input';
import { UpdateGraphqlCronInput } from './dto/update-graphql-cron.input';
import { GraphqlCron } from './entities/graphql-cron.entity';

@Injectable()
export class GraphqlCronService {

  constructor(@InjectRepository(GraphqlCron) private cronRepo: Repository<GraphqlCron>){}
  
  create(createGraphqlCronInput: CreateGraphqlCronInput) {
    return 'This action adds a new graphqlCron';
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
