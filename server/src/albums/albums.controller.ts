import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query, Req, Request,
    UploadedFile, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ObjectId} from "mongoose";
import {FileInterceptor} from "@nestjs/platform-express";
import {AlbumsService} from "./albums.service";
import {CreateAlbumDto} from "./dto/create.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";


@Controller('/albums')
export class AlbumsController {
    constructor(private albumService: AlbumsService) {}


    @Get()
    getAll(@Query('limit') limit: number, @Query('page') page:number) {
        return this.albumService.getAll(limit, page)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/myPlaylists')
    getMyPlaylists(@Request() req) {
        return this.albumService.getMyPlaylists(req.user._id)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('picture'))
    create(@UploadedFile() file: Express.Multer.File,  @Body() dto:CreateAlbumDto, @Request() req) {
        console.log(req.user)
        return this.albumService.create({...dto, owner: req.user._id}, file)
    }



    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id)
    }

    @Post('/addTrack/:id')
    addTrack(
        @Param('id') id: ObjectId,
        @Query('trackId') trackId: ObjectId)
    {
        return this.albumService.addTrack(id, trackId)
    }

}