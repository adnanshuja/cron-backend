import { Controller, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {User} from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AbilityModule } from './ability/ability.module';
import { PermissionsModule } from './permission/permission.module';
import { RolesModule } from './role/role.module';
import { Role } from './role/role.entity';
import { Permission } from './permission/permission.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'cron_db',
    entities: [User, Role, Permission],
    synchronize: true,   
}), UserModule, AuthModule, AbilityModule, PermissionsModule, RolesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
