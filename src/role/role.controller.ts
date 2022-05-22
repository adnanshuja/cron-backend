import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './role.service';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService){}

    @Post('/create')
    public createRole(@Body() body: { name: string, permissions: string[]}){
        return this.rolesService.create(body);
    }

    @Get('/get-all')
    public listAllRoles(){
        return this.rolesService.listAll();
    }
}
