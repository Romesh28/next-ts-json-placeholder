import { apiRoutes } from '@constants';
import { IPhotosDTO, IPhotosState } from '@interfaces';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { HTTP } from '@utils/http';

const initialState: IPhotosState = {
    loading: true,
    photos: [],
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setPhotos: (
            state: IPhotosState,
            { payload }: PayloadAction<IPhotosDTO[]>
        ): void => {
            state.photos = payload;
            state.loading = false;
        },
        startPhotosFetching: (state: IPhotosState): void => {
            state.loading = true;
        },
    },
});

export const getPhotosFetch = () => async (dispatch: Dispatch) => {
    try {
        dispatch(startPhotosFetching());
        dispatch(setPhotos(await HTTP.Request('GET', apiRoutes.photos())));
    } catch (e) {
        //
    }
};
export const { setPhotos, startPhotosFetching } = photosSlice.actions;

export default photosSlice.reducer;
