import { Module } from '@nestjs/common';
import { GraphqlCronService } from './graphql-cron.service';
import { GraphqlCronResolver } from './graphql-cron.resolver';

@Module({
  providers: [GraphqlCronResolver, GraphqlCronService]
})
export class GraphqlCronModule {}
