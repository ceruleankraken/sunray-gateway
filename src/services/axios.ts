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
    const refreshToken     = state.reducer.user.refreshToken;

    console.log(!accessToken)
    console.log(!refreshToken)
    console.log('===1==')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.headers['Refresh-token'] = refreshToken
      const decode: JwtPayload = jwt_decode(accessToken);

      console.log(decode?.exp)
      console.log('===2==')
      if (decode?.exp) {
        const isExpired = dayjs.unix(decode.exp).diff(dayjs()) < 1;

        console.log(!isExpired);
        console.log('===3==')
        if (!isExpired) return config;
        console.log(config.headers);
        console.log(`${API_URL}${REFRESH_TOKEN_PATH}`)
        console.log('===4==')
        const response = await axios.get(`${API_URL}${REFRESH_TOKEN_PATH}`);
        console.log(response);
        const data = response.data;
        store.dispatch(setAccessToken(data.access_token));
        store.dispatch(setRefreshToken(data.refresh_token));

        config.headers['Authorization'] = `Bearer ${data.user_session.access_token}`;
        config.headers['Refresh-token'] = `${data.user_session.refresh_token}`;
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
