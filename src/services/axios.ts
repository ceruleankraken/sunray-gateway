import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import router from 'next/router';
import dayjs from 'dayjs';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { API_URL, REFRESH_TOKEN_PATH } from '@/configs/constants';
import { setAccessToken } from '@/stores/features/auth.slice'
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

// http.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     const state: RootState = store.getState();
//     const accessToken = state.reducer.user.accessToken;

//     if (accessToken) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//       const decode: JwtPayload = jwt_decode(accessToken);

//       if (decode?.exp) {
//         const isExpired = dayjs.unix(decode.exp).diff(dayjs()) < 1;
//         if (!isExpired) return config;

//         const { data } = await axios.get(`${API_URL}${REFRESH_TOKEN_PATH}`, {
//           withCredentials: true,
//         });

//         console.log(data.accessToken);
//         store.dispatch(setAccessToken(data.accessToken));

//         config.headers['Authorization'] = `Bearer ${data.accessToken}`;
//         return config;
//       } else return config;
//     }

//     return config;
//   },
//   (error) => {
//     throw error;
//   },
// );

// http.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status == 401) {
//       //removeAccessToken();
//       router.replace('/login');
//     }
//     return Promise.reject(error);
//   },
// );

export { axios };
