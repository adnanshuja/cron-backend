import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository,  } from '@nestjs/typeorm';
import { Permission, PermissionsList } from 'src/permission/permission.entity';
import { In, QueryBuilder, Repository } from 'typeorm';
import { Role } from './role.entity';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { ResponseModel } from '../model/response.model';
@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepo: Repository<Role>,
        @InjectRepository(Permission) private permissionRepo: Repository<Permission>
        ){}

    public async create(body: {name: string, permissions: string[]}){
        try {
            const { name, permissions } = body;
            if(permissions.length === 0)
            permissions.push(PermissionsList.READ);
            const updatedPermissionsArray = permissions.map(permission => { 
                return {name: permission };
             });
            const foundPermissions = await this.permissionRepo.find({ where: updatedPermissionsArray});
            const newRole = new Role();
            newRole.name = name;
            newRole.permissions = foundPermissions;
            return this.roleRepo.save(newRole);
                
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public listAll () {
        return this.roleRepo.find({ relations: ['permissions']});
    }

    public async findByRole (name: string) {
        return this.roleRepo.findOne({ where: { name }, relations: ['permissions']});
    }

    public async update(id: number, roleDto: UpdateRoleDto):Promise<ResponseModel>{
        const role = await this.roleRepo.findOne(id);
        if(!role){
            throw new NotFoundException('No data found for the provided id')
        }
        Object.assign(role, roleDto);
        await this.roleRepo.save(role);
        return {
            success: true,
            message: "Role updated successfully",
            data: role
        }

    }

    public async findById(id: number): Promise<Role>{
        return this.roleRepo.findOne({ where: { id }});
    }

    public async delete(id: number):Promise<ResponseModel>{
        const role = await this.roleRepo.findOne(id);
        if(!role){
            throw new NotFoundException('No data found for the provided id')
        }
        await this.roleRepo.delete(id);
        return {
            success: true,
            message: "Role deleted successfully"
        }
    }

    public async getPermissions(name: string): Promise<[]>{
        const { id } = await this.findByRole(name);


        return [];
    }
}
