import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from 'src/permission/permission.entity';

@Entity('roles')

export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Permission, permission => permission.roles, { cascade: true, onDelete: 'CASCADE'})
    @JoinTable({
        name: 'roles_permissions',
        joinColumn: ({
            name: 'role_id',
            referencedColumnName: 'id'
        }),
        inverseJoinColumn: ({
            name: 'permission_id',
            referencedColumnName: 'id'
        })
    })
    permissions: Permission[];
}