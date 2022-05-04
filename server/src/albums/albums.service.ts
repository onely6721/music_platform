import {Injectable, Param} from '@nestjs/common';
import {Model, ObjectId} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {FileService, FileType} from "../file/file.service";
import {Album, AlbumDocument} from "./schemas/album.schema"
import {TrackDocument} from "../users/schemas/user.service";
import {Track} from "../tracks/schemas/track.schema";
import {CreateAlbumDto} from "./dto/create.dto";

@Injectable()
export class AlbumsService {
    constructor(@InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
                @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                private fileService: FileService) {}

    async getAll(limit = 5, page = 0): Promise<Album []>  {
        const albums = await this.albumModel.find().populate("tracks").skip(Number(page) * Number(limit)).limit(Number(limit))
        return albums
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album =  await this.albumModel.findById(id).populate("tracks")
        return album
    }


    async create(dto:CreateAlbumDto, picture): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const album = await this.albumModel.create({...dto, picture: picturePath})
        return album;
    }

    async update() {

    }

    async delete(id) {
        const album = await this.albumModel.findByIdAndDelete(id);
        return album._id
    }

    async addTrack(id, trackId) {
        const album = await this.albumModel.findById(id)
        const track = await this.trackModel.findById(trackId)
        album.tracks.push(track._id)
        album.save()
        return track
    }
}