import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto, UserLoginDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>, 
        private authService: AuthService
        ){}

    public create(payload: CreateUserDto){
        const userEntity = this.userRepo.create(payload);

    return this.mailExists(userEntity.email).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.authService.hashPassword(userEntity.password).pipe(
            switchMap((passwordHash: string) => {
              // Overwrite the user password with the hash, to store it in the db
              userEntity.password = passwordHash;
              return from(this.userRepo.save(userEntity)).pipe(
                map((savedUser: User) => {
                  const { password, ...user } = savedUser;
                  return user;
                })
              )
            })
          )
        } else {
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        }
      })
    )
    }

    private mailExists(email: string): Observable<boolean> {
        email = email.toLowerCase();
        return from(this.userRepo.findOne({ email })).pipe(
          map((user: User) => {
            if (user) {
              return true;
            } else {
              return false;
            }
          })
        )
      }

    public login(payload: UserLoginDto){
        return this.findByEmail(payload.email.toLowerCase()).pipe(
            switchMap((user: User) => {
              if (user) {
                return this.validatePassword(payload.password, user.password).pipe(
                  switchMap((passwordsMatches: boolean) => {
                    if (passwordsMatches) {
                      return this.findOne(user.id).pipe(
                        switchMap((user: User) => this.authService.generateJwt(user))
                      )
                    } else {
                      throw new HttpException('Login was not Successfulll', HttpStatus.UNAUTHORIZED);
                    }
                  })
                )
              } else {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
              }
            }
            )
          )
    }

    public findOne(id: number): Observable<User>{
        return from(this.userRepo.findOne({id}));
    }
    private validatePassword(password: string, passwordHash: string): Observable<Boolean>{
        return this.authService.comparePasswords(password, passwordHash);
    }

    public findByEmail(email: string): Observable<User>{
        return from(this.userRepo.findOne({email}, { select: [ 'id', 'name', 'email', 'password', 'role']}));
    }

    async findAll(){
        const users = this.userRepo.find();

        return users;
    }
}
