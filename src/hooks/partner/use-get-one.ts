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
        setForm(data);
      }
    },
  });
};
