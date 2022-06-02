import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UsersSchema} from "./schemas/user.schema";
import {UsersController} from "./users.controller";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UsersSchema}])
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [
        UsersService
    ]

})
export class UsersModule {}
