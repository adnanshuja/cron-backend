import { Injectable } from '@nestjs/common';
import { InjectRepository,  } from '@nestjs/typeorm';
import { Permission, PermissionsList } from 'src/permission/permission.entity';
import { In, QueryBuilder, Repository } from 'typeorm';
import { Role } from './role.entity';

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
}
