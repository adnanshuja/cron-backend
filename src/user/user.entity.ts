import { AfterInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({
        type: "simple-enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;


    @AfterInsert()
    logInsert() {
        console.log("inserted user with id", this.id);
    }

    @BeforeUpdate()
    emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}