import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';


export const usePartnerGet = () => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useQuery({
    queryKey : ['partner-get'],
    queryFn  : (payload) => api.getLogout(),
    enabled  : false,
    retry    : false,
    onSuccess: async () => {
      // await Promise.all([ dispatch(userLogout()) ]);

      router.replace('/login');
    },
  });
};
