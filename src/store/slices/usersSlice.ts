import { apiRoutes } from '@constants';
import { IUsersDTO, IUsersState } from '@interfaces';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { HTTP } from '@utils/http';

const initialState: IUsersState = {
    users: [],
    loading: true,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (
            state: IUsersState,
            { payload }: PayloadAction<IUsersDTO[]>
        ): void => {
            state.users = payload;
            state.loading = false;
        },
        startUsersFetching: (state: IUsersState): void => {
            state.loading = true;
        },
    },
});

export const getUsersFetch = () => async (dispatch: Dispatch) => {
    try {
        dispatch(startUsersFetching());
        dispatch(setUsers(await HTTP.Request('GET', apiRoutes.users())));
    } catch (e) {}
};

export const { setUsers, startUsersFetching } = usersSlice.actions;

export default usersSlice.reducer;
