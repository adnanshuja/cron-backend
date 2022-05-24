import { Module } from '@nestjs/common';
import { GraphqlCronService } from './graphql-cron.service';
import { GraphqlCronResolver } from './graphql-cron.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlCron } from './entities/graphql-cron.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GraphqlCron])],
  providers: [GraphqlCronResolver, GraphqlCronService]
})
export class GraphqlCronModule {}
