import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import router from 'next/router';
import dayjs from 'dayjs';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { API_URL, REFRESH_TOKEN_PATH } from '@/configs/constants';
import { setAccessToken, setRefreshToken } from '@/stores/features/auth.slice'
import { store, RootState } from '@/stores/store';

export const http: AxiosInstance = axios.create({
  baseURL        : API_URL,
  withCredentials: true,
  headers        : {
    // 'Authorization': localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token'): null,
    'Content-Type' : 'application/json',
    'accept'       : 'application/json'
  }
});

http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const state: RootState = store.getState();
    const accessToken      = state.reducer.user.accessToken;
    const refreshToken      = state.reducer.user.refreshToken;

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      const decode: JwtPayload = jwt_decode(accessToken);

      if (decode?.exp) {
        const isExpired = dayjs.unix(decode.exp).diff(dayjs()) < 1;
        console.log("Rest1");
        if (!isExpired) return config;

        const { data } = await axios.post(`${API_URL}${REFRESH_TOKEN_PATH}`, {
          access_token: accessToken,
          refresh_token: refreshToken
        }, { withCredentials: true});
        console.log("Rest");
        store.dispatch(setAccessToken(data.access_token));
        store.dispatch(setRefreshToken(''));

        config.headers['Authorization'] = `Bearer ${data.user_session.access_token}`;
        return config;
      } else return config;
    }

    return config;
  },
  (error) => {
    throw error;
  },
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error)
    // if (error.response.status == 401) {
    //   //removeAccessToken();
    //   router.replace('/login');
    // }
    return Promise.reject(error);
  },
);

export { axios };
