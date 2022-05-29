import { Role } from "src/role/role.entity";
import { AfterInsert, BaseEntity, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    MANAGER = "manager"
}

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true})
    email: string;
    
    @Column()
    password: string;

    // @CreateDateColumn({
    //     type: 'timestamp',
    //     precision: 3,
    //     name: 'created_at',
    //     nullable: false,
    //     default: Date.now()
    // })
    // createdAt: Date;

    // @UpdateDateColumn({
    //     type: 'timestamp',
    //     precision: 3,
    //     name: 'updated_at'
    // })
    // updatedAt: Date;

    @ManyToOne(() => Role, role => role.users, { cascade: false })
    role: Role

    @AfterInsert()
    logInsert() {
        console.log("inserted user with id", this.id);
    }

    @BeforeUpdate()
    emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}