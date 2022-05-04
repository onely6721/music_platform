import {ITrack} from "./track";

export interface IAlbum {
    _id: string;
    name: string;
    owner: string;
    tracks: ITrack[];
    picture: string;
    uploadDate: string;

}