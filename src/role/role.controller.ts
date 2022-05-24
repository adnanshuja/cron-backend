import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RolesService } from './role.service';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { ResponseModel } from '../model/response.model';

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

    @Patch('/:id')
    async updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto):Promise<ResponseModel>{
        return await this.rolesService.update(id, updateRoleDto);
    }

    @Delete('/:id')
    async deleteRole(@Param('id') id: number):Promise<ResponseModel>{
        return await this.rolesService.delete(id);
    }
}
