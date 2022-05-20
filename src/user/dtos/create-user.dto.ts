import { IsEmail, IsString, IsAlphanumeric, IsOptional } from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsAlphanumeric()
    password: string;

}

export class UserLoginDto {

    @IsEmail()
    email: string;

    @IsAlphanumeric()
    password: string;

}


export interface UserI {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role: UserRole;
}