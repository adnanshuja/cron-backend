import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission, PermissionsList } from './permission.entity';
import { UpdateRoleDto } from '../role/dtos/update-role.dto';
import { ResponseModel } from '../model/response.model';

@Injectable()
export class PermissionsService {
    constructor(@InjectRepository(Permission) private permissionRepo: Repository<Permission>){}

    public async create(name: PermissionsList): Promise<ResponseModel>{
        try {
            const addedPermission = await this.permissionRepo.save({ name });
            return{
                success: true,
                message: "Permission added successfully",
                data: addedPermission
            }
        } catch (error) {
            return {
                error: error
            }

        }
    }

    public async listAll():Promise<ResponseModel>{
        const permissions = await this.permissionRepo.find();
        return {
            success: true,
            message: "Permissions retrieved successfully",
            data: permissions
        }
    }


}
