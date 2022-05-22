import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BeforeUpdate } from 'typeorm';
import { Role } from 'src/role/role.entity';

export enum PermissionsList {
    MANAGE= 'manage',
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete'
};

@Entity('permissions')
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "simple-enum",
        enum: PermissionsList,
        default: PermissionsList.READ,
        unique: true
    })
    name: PermissionsList;

    @ManyToMany(() => Role, Role => Role.permissions)
    roles: Role[]
}