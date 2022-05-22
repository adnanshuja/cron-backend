import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsController } from './permission.controller';
import { Permission } from './permission.entity';
import { PermissionsService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionsController],
  providers: [PermissionsService]
})
export class PermissionsModule {}
