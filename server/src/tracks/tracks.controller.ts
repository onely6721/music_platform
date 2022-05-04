import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ObjectId} from "mongoose";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CreateTrackDto, UpdateTrackDto} from "./dto/create.dto";
import {TracksService} from "./tracks.service";

@Controller('/tracks')
export class TracksController {
   constructor(private trackService: TracksService) {}


   @Get(':id')
   getOne(@Param('id') id: ObjectId) {
      return this.trackService.getOne(id)
   }

   @Get()
   getAll() {
         return this.trackService.getAll()
   }


   @Post()
   @UseInterceptors(FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
   ]))
   create(@UploadedFiles() files,  @Body() dto: CreateTrackDto) {
      const {picture, audio} = files
      return this.trackService.create(dto, picture[0], audio[0]);
   }

   @Put(':id')
   update(@Param('id') id: ObjectId,  @Body() dto: UpdateTrackDto) {
      return this.trackService.update(id, dto)
   }

   @Delete(':id')
   delete(@Param('id') id: ObjectId) {
      return this.trackService.delete(id)
   }

   @Post('/listens/:id')
   listen(@Param('id') id:ObjectId) {
      return this.trackService.listen(id)
   }

   @Post('/likes/:id')
   like(@Param('id') id:ObjectId) {
      return this.trackService.like(id)
   }

}