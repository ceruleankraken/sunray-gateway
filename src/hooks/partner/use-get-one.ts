import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';


export const usePartnerGetOne = (partner_id?: string, setForm?: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useQuery({
    queryKey : ['partner-get'],
    queryFn  : (payload) => api.getPartnerOne(partner_id),
    enabled  : false,
    retry    : false,
    onSuccess: async (data) => {
      if(partner_id) {
        console.log(data);
        setForm(data);
      }
      // console.log("mamama");
      // console.log(handleData);
      // console.log(data);
      // handleData(data);
      // await Promise.all([
      //   dispatch(setUserAuth(data.user_session.user)),
      //   dispatch(setAccessToken(data.user_session.access_token || '')),
      //   dispatch(setRefreshToken(data.user_session.refresh_token || '')),
      //   dispatch(setUserOrg(data.org)),
      //   dispatch(setSidebar(data.menu)),
      // ]);
      // await Promise.all([ dispatch(userLogout()) ]);

      // router.replace('/login');
    },
  });
};
