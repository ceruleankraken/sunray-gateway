import { useQuery } from 'react-query';
import api from '@/services';


export const useProductGetActive = () => {
  
  return useQuery({
    queryKey : ['product-get-active'],
    queryFn  : (payload) => api.getProductActive(),
    enabled  : false,
    retry    : false,
    onSuccess: async (data) => {
    },
  });
};
