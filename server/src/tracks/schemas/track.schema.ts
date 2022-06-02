import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';
import {User} from "../../users/schemas/user.schema";
export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: User

    @Prop()
    artist: string;

    @Prop()
    text: string;

    @Prop({default: 0})
    likes: number

    @Prop({default: 0})
    listens: number;

    @Prop()
    picture: string;

    @Prop()
    audio: string;

    @Prop()
    genre: string

    @Prop({
        type: Date,
        required: true,
        default: Date.now()
    })
    uploadDate: Date;
}

export const TrackSchema = SchemaFactory.createForClass(Track);