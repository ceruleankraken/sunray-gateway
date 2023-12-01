import { useQuery } from 'react-query';
import api from '@/services';


export const useProductGetOne = (product_id?: string, setForm?: any) => {

  return useQuery({
    queryKey : ['product-get-one'],
    queryFn  : (payload) => api.getProductOne(product_id),
    enabled  : false,
    retry    : false,
    onSuccess: async (data) => {
      if(product_id) {
        console.log(data);
        setForm(data);
      }
    },
  });
};
