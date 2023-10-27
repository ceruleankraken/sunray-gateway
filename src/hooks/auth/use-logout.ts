import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import {
  setUserAuth,
  setAccessToken,
  userLogout,
} from '@/stores/features/auth.slice';
import { useTypedSelector } from '../other/use-type-selector';
import { AlertError, AlertSuccess } from '@/utils/notification';
// import { setSidebar } from '@/stores/features/sidebar/slice';


export interface LogoutFormPropsRequest {
  access_token : string;
  refresh_token: string;
}

const useLogout = () => {
  const dispatch = useDispatch();
  const router   = useRouter();

  // return useQuery({
  //   queryKey : ['logout'],
  //   queryFn  : (payload) => api.getLogout(),
  //   enabled  : false,
  //   retry    : false,
  //   onSuccess: async () => {
  //     await Promise.all([ dispatch(userLogout()) ]);

  //     router.replace('/login');
  //   },
  // });
  
  return useMutation({
    mutationKey: ['logout'],
    mutationFn : (payload: LogoutFormPropsRequest) => api.getLogout({ payload }),
    onSuccess  : async (data) => {
      await Promise.all([
        dispatch(userLogout())
        // dispatch(setUserOrg(data.org)),
        // dispatch(setSidebar(data.menu)),
      ]);

      router.replace('/login');
      AlertSuccess("Logout Success")
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message)
      console.log(data);
    },
  });
};

export default useLogout;
