export interface IPhotosState {
    photos: IPhotosDTO[];
    loading: boolean;
}

export interface IPhotosDTO {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
