import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/stores/store';
import { User } from '@/types/user';
import storage from 'redux-persist/lib/storage';

type UserState = {
  user: User;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  // org: Org[];
};

const initialState: UserState = {
  user: {
    username  : '',
    full_name : '',
    created_at: '',
    isactive  : true,
  },
  accessToken: '',
  refreshToken: '',
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
    setRefreshToken: (state, actions: PayloadAction<string>) => {
      const { payload } = actions;
      state.refreshToken = payload;
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
export const { setUserAuth, setAccessToken, setRefreshToken, userLogout } = userSlice.actions;

export default userSlice.reducer;
