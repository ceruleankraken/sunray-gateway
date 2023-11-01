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

export interface LoginFormPropsRequest {
  username: string;
  password: string;
}

export const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (payload: LoginFormPropsRequest) => api.getLogin({ payload }),
    onSuccess: async (data) => {
      await Promise.all([
        dispatch(setUserAuth(data.user_information || '')),
        dispatch(setAccessToken(data.user_session.access_token || '')),
        dispatch(setRefreshToken(data.user_session.refresh_token || '')),
        // dispatch(setUserOrg(data.org)),
        // dispatch(setSidebar(data.menu)),
      ]);
      AlertSuccess("Login Success");

      // router.replace('/');
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message)
      console.log(data);
    },
  });
};
