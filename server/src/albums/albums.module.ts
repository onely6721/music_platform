import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {FileService} from "../file/file.service";
import {Album, AlbumSchema} from "./schemas/album.schema";
import {AlbumsController} from "./albums.controller";
import {AlbumsService} from "./albums.service";
import {TrackSchema} from "../users/schemas/user.service";
import {Track} from "../tracks/schemas/track.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name:  Album.name, schema: AlbumSchema}]),
        MongooseModule.forFeature([{name:  Track.name, schema: TrackSchema}]),
    ],
    controllers: [AlbumsController],
    providers: [AlbumsService, FileService],
})
export class AlbumsModule {}
