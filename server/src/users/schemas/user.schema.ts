import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    firstName: string;

    @Prop()
    secondName: string;

    @Prop()
    password: string

    @Prop()
    email: string

    @Prop({enum: ["Admin", "User"]})
    role: string

    @Prop( {default: false})
    verification: boolean


}

export const UsersSchema = SchemaFactory.createForClass(User);