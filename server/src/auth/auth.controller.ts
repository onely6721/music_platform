import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create.dto";
import {JwtService} from "@nestjs/jwt";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller('/auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return  this.authService.registration(userDto)
    }

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return  this.authService.login(userDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/test')
    test() {
        return "Ок"
    }

}