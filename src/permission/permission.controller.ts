import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PermissionsList } from './permission.entity';
import { PermissionsService } from './permission.service';
import { UpdateRoleDto } from '../role/dtos/update-role.dto';
import { ResponseModel } from '../model/response.model';

@Controller('permissions')
export class PermissionsController {
    
    constructor(private readonly permissionService: PermissionsService){

    }
    @Post('/create')
    async createPermission(@Body() { name }):Promise<ResponseModel>{
       return await this.permissionService.create(name);
    }

    @Get('/get-all')
    async listAllPermissions():Promise<ResponseModel>{
        return await this.permissionService.listAll();
    }


}
