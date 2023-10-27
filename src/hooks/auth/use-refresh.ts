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
// import { setSidebar } from '@/stores/features/sidebar/slice';


export interface RefreshFormPropsRequest {
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
    mutationKey: ['refresh'],
    mutationFn : (payload: RefreshFormPropsRequest) => api.getLogout({ payload }),
    onSuccess  : async (data) => {
      await Promise.all([
        dispatch(userLogout())
        // dispatch(setUserOrg(data.org)),
        // dispatch(setSidebar(data.menu)),
      ]);

      router.replace('/login');
    },
    onError: (data) => {
      console.log('error');
      console.log(data);
    },
  });
};

export default useLogout;
