import { Module } from '@nestjs/common';
import { GraphqlCronService } from './graphql-cron.service';
import { GraphqlCronResolver } from './graphql-cron.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlCron } from './entities/graphql-cron.entity';
import { SendEmailService } from './send-email.service';

@Module({
  imports: [TypeOrmModule.forFeature([GraphqlCron])],
  providers: [GraphqlCronResolver, GraphqlCronService, SendEmailService]
})
export class GraphqlCronModule {}
