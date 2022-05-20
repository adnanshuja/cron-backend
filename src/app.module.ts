import { Controller, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {User} from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AbilityModule } from './ability/ability.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'cron_db',
    entities: [User],
    synchronize: true,   
}), UserModule, AuthModule, AbilityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
