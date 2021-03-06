import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';
import {User} from "../../users/schemas/user.schema";
import {Track} from "../../tracks/schemas/track.schema";
export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: User

    @Prop()
    artists: String[];

    @Prop()
    picture: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    tracks: Track[]

    @Prop({
        type: Boolean,
        default: false,
    })
    isPlaylist: boolean;

    @Prop({
        type: Date,
        required: true,
        default: Date.now()
    })
    uploadDate: Date;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);