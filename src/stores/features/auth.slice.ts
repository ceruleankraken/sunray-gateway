import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/stores/store';
import { User } from '@/types/user';
import storage from 'redux-persist/lib/storage';

type UserState = {
  user: User;
  accessToken: string;
  // org: Org[];
};

const initialState: UserState = {
  user: {
    uid     : undefined,
    username: '',
    name    : '',
    sex     : '',
    email   : '',
  },
  accessToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuth: (state, actions: PayloadAction<User>) => {
      const { payload } = actions;
      state.user        = payload;
      return state;
    },
    setAccessToken: (state, actions: PayloadAction<string>) => {
      const { payload } = actions;
      state.accessToken = payload;
      return state;
    },
    userLogout: (state) => {
      storage.removeItem('persist:root');
      state = initialState;
      return state;
    },
  },
});

export const getUserAuth                                 = (state: RootState) => state.reducer.user.user;
export const getAccessToken                              = (state: RootState) => state.reducer.user.accessToken;
// export const getOrg                                      = (state: RootState) => state.reducer.user.org;
export const { setUserAuth, setAccessToken, userLogout } = userSlice.actions;

export default userSlice.reducer;
