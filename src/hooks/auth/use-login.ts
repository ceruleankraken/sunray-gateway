import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import {
  setUserAuth,
  setAccessToken,
} from '@/stores/features/auth.slice';
// import { setSidebar } from '@/stores/features/sidebar/slice';

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
        dispatch(setUserAuth(data.user)),
        dispatch(setAccessToken(data.accessToken)),
        // dispatch(setUserOrg(data.org)),
        // dispatch(setSidebar(data.menu)),
      ]);

      // router.replace('/');
    },
    onError: (data) => {
      console.log('error');
      console.log(data);
    },
  });
};
