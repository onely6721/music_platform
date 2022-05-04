import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";
import {TracksModule} from "./tracks/tracks.module";
import {FileModule} from "./file/file.module";
import * as path from 'path'
import {ServeStaticModule} from "@nestjs/serve-static";
import {AlbumsModule} from "./albums/albums.module";

@Module({
  imports: [
      ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
      MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.41wkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
      ConfigModule.forRoot(),
      TracksModule,
      AlbumsModule,
      FileModule

  ],

})
export class AppModule {}
