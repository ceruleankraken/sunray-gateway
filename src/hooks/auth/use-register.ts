import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import {
  setUserAuth,
  setAccessToken,
  setRefreshToken,
} from '@/stores/features/auth.slice';
import { AlertError, AlertSuccess } from '@/utils/notification';
// import { setSidebar } from '@/stores/features/sidebar/slice';

export interface RegisterFormPropsRequest {
  username: string;
  password: string;
}

export const useRegister = () => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['login'],
    mutationFn : (payload: RegisterFormPropsRequest) => api.getLogin({ payload }),
    onSuccess  : (data) => {
      // await Promise.all([
        // dispatch(setUserAuth(data.user_session.user)),
        // dispatch(setAccessToken(data.user_session.access_token || '')),
        // dispatch(setRefreshToken(data.user_session.refresh_token || '')),
        // dispatch(setUserOrg(data.org)),
        // dispatch(setSidebar(data.menu)),
      // ]);
      AlertSuccess("Register Success")
      router.replace('/');
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message)
      console.log(data);
    },
  });
};
