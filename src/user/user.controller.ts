import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { map, switchMap } from 'rxjs';
import { AbilityFactory } from 'src/ability/ability.factory';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';
import { CreateUserDto, UserI, UserLoginDto } from './dtos/create-user.dto';
import { User, UserRole } from './user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {

    constructor(private readonly userService: UserService, private authService: AuthService, private abilityFactory: AbilityFactory){}


    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/signup')
    async createUser(@Body() body:CreateUserDto) {
        
        const user: User = await new Promise(resolve => {
            this.userService.findByEmail("adnan1@gmail.com").subscribe(((user: User) => resolve(user)))
        })
        const ability = this.abilityFactory.defineAbility(user);
        
        return this.userService.create(body);
    }
   
    @Post('/login')
    login(@Body() body: UserLoginDto){
        return this.authService.generateJwt(body);
    }

    @UseGuards(JwtAuthGaurd)
    @Get('/get-all')
    getAllUsers(){
        return this.userService.findAll();
    }
}
