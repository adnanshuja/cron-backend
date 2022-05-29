import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/role/role.entity';
import { RolesService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { CreateUserDto, UserLoginDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>, 
        private authService: AuthService,
        private rolesService: RolesService
        ){}

    public create(payload: CreateUserDto){

        try {
            const userEntity = this.userRepo.create(payload);
            return this.mailExists(userEntity.email).pipe(
            switchMap((exists: boolean) => {
                if (!exists) {
                return this.authService.hashPassword(userEntity.password).pipe(
                    switchMap((passwordHash: string) => {
                    // Overwrite the user password with the hash, to store it in the db
                    userEntity.password = passwordHash;
                    return this.getBasicRole().pipe(
                        switchMap((role: Role) => {
                            userEntity.role = role;
                            return from(this.userRepo.save(userEntity)).pipe(
                                map((savedUser: User) => {
                                const { password, ...user } = savedUser;
                                return user;
                                })
                            )
                        })
                    )
                    })
                )
                } else {
                throw new HttpException({ message: "email already in use "}, HttpStatus.CONFLICT);
                }
            })
            ) 
        } catch (error) {
            throw new Error(error.message);
        }
        
    }
    private getBasicRole (): Observable<Role> {
        return from(this.rolesService.findByRole('user')).pipe(
            map((role) => role)
        );
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
                      throw new HttpException({message: 'Login was not Successfulll'}, HttpStatus.UNAUTHORIZED);
                    }
                  })
                )
              } else {
                throw new HttpException({message: 'User not found'}, HttpStatus.NOT_FOUND);
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
        const users = this.userRepo.find({ relations: ['role', 'role.permissions']});

        return (await users).map((user) => {

            const {password, ...result} = user;
            const finalResult = { name: '', email: '', role: '', permissions: [] };
            finalResult.name = result.name;
            finalResult.email = result.email;
            finalResult.role = result.role.name;
            for( const permission of result.role.permissions ){
              finalResult.permissions.push(permission.name);
            }
            return finalResult;
        });
    }

    async deleteUser (id: number){
      const response = await this.userRepo.delete({ id });
      console.log(response);
      return response;
    }

    async getUserProfile (email: string) {
      const user = await this.userRepo.find({ where: { email }, relations: ['role', 'role.permissions']});
      return user;
    }

    async updateUserRole(id: number, roleName: string){
      const user = await this.userRepo.findOne({ where: { id }});
      const role = await this.rolesService.findByRole(roleName);
      user.role = role;
      return await user.save();
    }
}
