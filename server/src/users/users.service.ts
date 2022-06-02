import { Injectable } from '@nestjs/common';
import {User, UserDocument, UsersSchema} from "./schemas/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateUserDto} from "./dto/create.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>)
    {}


    async findByEmail(email: string): Promise<User| undefined> {
        const user = await this.userModel.findOne({email: email});
        return user
    }

    async createUser(userDto: CreateUserDto) {
        const user = await this.userModel.create(userDto)
        return user
    }


}
