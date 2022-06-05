import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/schemas/user.schema";
import * as bcrypt from 'bcryptjs'
import {CreateUserDto} from "../users/dto/create.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new UnauthorizedException({message: "Не корректные данные"})
        const passwordEquals = await bcrypt.compare(pass, user.password)
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: "Не корректные данные"})
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto.email, userDto.password)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.findByEmail(userDto.email)
        console.log(candidate)
        if (candidate) {
            throw new HttpException("Пользователь с таким email существует", HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.usersService.createUser({...userDto, password: hashPassword})
        const token = this.generateToken(user)
        return token
    }

    async generateToken(user: CreateUserDto) {
        const payload = {email: user.email, _id: user._id}
        const token = this.jwtService.sign(payload)
        return token

    }
}
