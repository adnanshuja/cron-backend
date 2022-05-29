import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BeforeUpdate, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Permission } from 'src/permission/permission.entity';
import { User } from 'src/user/user.entity';

@Entity('roles')

export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at'
    })
    updatedAt: Date;

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