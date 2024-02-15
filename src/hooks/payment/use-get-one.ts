import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';


export const usePaymentGetOne = (payment_id?: string, setForm?: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useQuery({
    queryKey : ['payment-get-one'],
    queryFn  : (payload) => api.getPaymentOne(payment_id),
    enabled  : false,
    retry    : false,
    onSuccess: async (data) => {
      if(payment_id) {
        setForm(data);
      }
    },
  });
};
