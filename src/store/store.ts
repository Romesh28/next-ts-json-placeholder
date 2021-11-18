import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/usersSlice';
import albumsSlice from './slices/albumsSlice';
import photosSlice from './slices/photosSlice';

export const store = configureStore({
    reducer: {
        users: userSlice,
        albums: albumsSlice,
        photos: photosSlice,
    },
});
