import { useQuery } from 'react-query';
import api from '@/services';


export const useInvoiceGetActive = ({partnerID}: any) => {
  
  return useQuery({
    queryKey : ['invoice-get-active'],
    queryFn  : (payload) => api.getInvoiceActive(partnerID),
    enabled  : false,
    retry    : false,
    onSuccess: async (data) => {
    },
  });
};
