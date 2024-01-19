import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';


export const useInvoiceLineGetOne = (invoice_line_id?: string, setForm?: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useQuery({
    queryKey : ['invoice-line-get-one'],
    queryFn  : (payload) => api.getInvoiceLineOne(invoice_line_id),
    enabled  : false,
    retry    : false,
    onSuccess: async (data) => {
      if(invoice_line_id) {
        setForm(data);
      }
    },
  });
};
