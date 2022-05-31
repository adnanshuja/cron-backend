import { Body, ClassSerializerInterceptor, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AbilityFactory, ACTIONS } from 'src/ability/ability.factory';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';
import { CreateUserDto, UserLoginDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {

    constructor(
      private readonly userService: UserService,
      private authService: AuthService,
      private abilityFactory: AbilityFactory
    ){}


    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/signup')
    async createUser(@Body() body:CreateUserDto) {
        
        const user: User = await new Promise(resolve => {
            this.userService.findByEmail("adnan1@gmail.com").subscribe(((user: User) => resolve(user)))
        })
        const ability = this.abilityFactory.defineAbility(user);
        const isAllowed = ability.can(ACTIONS.CREATE, User);
        if(isAllowed) 
        {
            throw new ForbiddenException("User is forbidden to perform this action")} else {
        return this.userService.create(body);
        }
    }

    @UseGuards(JwtAuthGaurd)
    @Delete('/delete/:id')
    deleteUser(@Param('id') id:number ){
        console.log(id)
        return this.userService.deleteUser(id);
    }

    @Post('/login')
    async login(@Body() body: UserLoginDto){
        const token = await new Promise((resolve) => {
            (this.userService.login(body)).subscribe((token) => resolve(token))
        })
        return { accessToken: token};
    }

    @UseGuards(JwtAuthGaurd)
    @Get('/get-all')
    getAllUsers(){
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGaurd)
    @Put('/update-role')
    updateUserRole(@Body() body){
        return this.userService.updateUserRole(body.id, body.roleName);
    }

    @UseGuards(JwtAuthGaurd)
    @Get('/get-profile')
    getUserProfile(@Request() req){
        return req.user;
    }
}
