import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BeforeUpdate, OneToMany } from 'typeorm';
import { Permission } from 'src/permission/permission.entity';
import { User } from 'src/user/user.entity';

@Entity('roles')

export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @BeforeUpdate()
    roleToLowerCase(){
        this.name = this.name.toLowerCase();
    }

    @OneToMany(() => User, user => user.role)
    users: User

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