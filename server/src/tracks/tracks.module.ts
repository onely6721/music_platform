import { Module } from '@nestjs/common';
import {TracksService} from "./tracks.service";
import {TracksController} from "./tracks.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Track, TrackSchema} from "./schemas/track.schema";
import {FileService} from "../file/file.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
    ],
    controllers: [TracksController],
    providers: [TracksService, FileService],
})
export class TracksModule {}
