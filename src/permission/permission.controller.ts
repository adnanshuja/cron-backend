import { Body, Controller, Get, Post } from '@nestjs/common';
import { PermissionsList } from './permission.entity';
import { PermissionsService } from './permission.service';

@Controller('permissions')
export class PermissionsController {
    
    constructor(private readonly permissionService: PermissionsService){

    }
    @Post('/create')
    createPermission(@Body() { name }){
       return this.permissionService.create(name);
    }

    @Get('/get-all')
    listAllPermissions(){
        return this.permissionService.listAll();
    }
}
