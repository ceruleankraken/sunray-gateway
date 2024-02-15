import { useQuery } from 'react-query';
import api from '@/services';


export const useInvoiceGetActive = () => {
  
  return useQuery({
    queryKey : ['invoice-get-active'],
    queryFn  : (payload) => api.getInvoiceActive(),
    enabled  : false,
    retry    : false,
    onSuccess: async (data) => {
    },
  });
};
