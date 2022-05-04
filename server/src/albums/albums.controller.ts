import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {ObjectId} from "mongoose";
import {FileInterceptor} from "@nestjs/platform-express";
import {AlbumsService} from "./albums.service";
import {CreateAlbumDto} from "./dto/create.dto";


@Controller('/albums')
export class AlbumsController {
    constructor(private trackService: AlbumsService) {}


    @Get()
    getAll(@Query('limit') limit: number, @Query('page') page:number) {
        return this.trackService.getAll(limit, page)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id)
    }

    @Post()
    @UseInterceptors(FileInterceptor('picture'))
    create(@UploadedFile() file: Express.Multer.File,  @Body() dto:CreateAlbumDto) {
        return this.trackService.create(dto, file)
    }


    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id)
    }

    @Post('/addTrack/:id')
    addTrack(
        @Param('id') id: ObjectId,
        @Query('trackId') trackId: ObjectId)
    {
        return this.trackService.addTrack(id, trackId)
    }

}