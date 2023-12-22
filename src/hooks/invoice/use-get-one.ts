import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';


export const useInvoiceGetOne = (invoice_id?: string, setForm?: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useQuery({
    queryKey : ['invoice-get-one'],
    queryFn  : (payload) => api.getInvoiceOne(invoice_id),
    enabled  : false,
    retry    : false,
    onSuccess: async (data) => {
      if(invoice_id) {
        setForm(data);
      }
    },
  });
};
