import { Injectable } from '@nestjs/common';
import { CreateGraphqlCronInput } from './dto/create-graphql-cron.input';
import { UpdateGraphqlCronInput } from './dto/update-graphql-cron.input';

@Injectable()
export class GraphqlCronService {
  create(createGraphqlCronInput: CreateGraphqlCronInput) {
    return 'This action adds a new graphqlCron';
  }

  findAll() {
    return `This action returns all graphqlCron`;
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
