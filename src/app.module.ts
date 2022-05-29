import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AbilityModule } from './ability/ability.module';
import { PermissionsModule } from './permission/permission.module';
import { RolesModule } from './role/role.module';
import { Role } from './role/role.entity';
import { Permission } from './permission/permission.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphqlCronModule } from './graphql-cron/graphql-cron.module';
import { GraphqlCron } from './graphql-cron/entities/graphql-cron.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';
import { Cron } from './cron/entities/cron.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'cron_db',
    entities: [User, Role, Permission, GraphqlCron, Cron],
    synchronize: true,
  }), UserModule, AuthModule, AbilityModule, PermissionsModule, RolesModule,
  GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    driver: ApolloDriver,
    sortSchema: true
  }), GraphqlCronModule, ScheduleModule.forRoot(), CronModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
