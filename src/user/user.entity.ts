import { Role } from "src/role/role.entity";
import { AfterInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    MANAGER = "manager"
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true})
    email: string;
    
    @Column()
    password: string;


    @ManyToOne(() => Role, role => role.users)
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