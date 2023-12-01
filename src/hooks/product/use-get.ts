import { useQuery } from 'react-query';
import api from '@/services';


export const useProductGet = (sortObject: {}) => {
  
  return useQuery({
    queryKey : ['product-get'],
    queryFn  : (payload) => api.getProduct(sortObject),
    enabled  : false,
    retry    : false,
    onSuccess: async (data) => {
    },
  });
};
