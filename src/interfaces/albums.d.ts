export interface IAlbumsState {
    albums: IAlbumsDTO[];
    loading: boolean;
}

export interface IAlbumsDTO {
    userId: number;
    id: number;
    title: string;
}
