import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission, PermissionsList } from './permission.entity';

@Injectable()
export class PermissionsService {
    constructor(@InjectRepository(Permission) private permissionRepo: Repository<Permission>){}

    public async create(name: PermissionsList){
        try {
            const addedPermission = this.permissionRepo.save({ name });
            return addedPermission;
        } catch (error) {
            
        }
    }

    public listAll(){
        return this.permissionRepo.find();
    }
}
