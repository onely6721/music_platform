export class CreateTrackDto {
    readonly name;
    readonly owner;
    readonly text;
    readonly artist;
}

export class UpdateTrackDto {
    readonly name;
    readonly artist;
}