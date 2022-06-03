import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';
import {Track} from "../../tracks/schemas/track.schema";
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

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    likedTracks: Track[]

    @Prop({enum: ["Admin", "User"]})
    role: string

    @Prop( {default: false})
    verification: boolean


}

export const UsersSchema = SchemaFactory.createForClass(User);