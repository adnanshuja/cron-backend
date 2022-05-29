import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';
const bcrypt = require ('bcrypt');

import { UserLoginDto } from '../user/dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor( private jwtService: JwtService){}

    generateJwt(user: UserLoginDto): Observable<string> {
        
        return from(this.jwtService.signAsync({user}));
    }

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePasswords(password: string, storedPasswordHash: string): Observable<any> {
        return from(bcrypt.compare(password, storedPasswordHash));
    }
}
