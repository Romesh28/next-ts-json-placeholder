import { IAlbumsDTO, IAlbumsState } from '@interfaces';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { HTTP } from '@utils/http';
import { apiRoutes } from '@constants';

const initialState: IAlbumsState = {
    albums: [],
    loading: true,
};

const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        setAlbums: (
            state: IAlbumsState,
            { payload }: PayloadAction<IAlbumsDTO[]>
        ): void => {
            state.albums = payload;
            state.loading = false;
        },
        startAlbumsFetching: (state: IAlbumsState): void => {
            state.loading = true;
        },
    },
});

export const getAlbumsFetch = () => async (dispatch: Dispatch) => {
    try {
        dispatch(startAlbumsFetching());
        dispatch(setAlbums(await HTTP.Request('GET', apiRoutes.albums())));
    } catch (e) {
        //
    }
};

export const { setAlbums, startAlbumsFetching } = albumsSlice.actions;

export default albumsSlice.reducer;
