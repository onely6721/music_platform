import {Injectable, Param} from '@nestjs/common';
import {Model, ObjectId} from "mongoose";
import {Track, TrackDocument} from "./schemas/track.schema";
import {InjectModel} from "@nestjs/mongoose";
import {FileService, FileType} from "../file/file.service";
import {CreateTrackDto, UpdateTrackDto} from "./dto/create.dto";

@Injectable()
export class TracksService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                private fileService: FileService) {}

    async getAll(): Promise<Track []>  {
        const tracks = await this.trackModel.find()
        return tracks
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id)
        return track
    }

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const track = await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
        return track;
    }

    async update(id, dto: UpdateTrackDto) {
        const track = await this.trackModel.findByIdAndUpdate(id, dto, {new: true})
        return track
    }

    async delete(id) {
        const track = await this.trackModel.findByIdAndDelete(id);
        return track._id
    }

    async listen(id) {
        const track = await this.trackModel.findById(id);
        track.listens += 1;
        track.save()
        return track
    }

    async like(id) {
        const track = await this.trackModel.findById(id);
        track.likes += 1;
        track.save()
        return track
    }
}