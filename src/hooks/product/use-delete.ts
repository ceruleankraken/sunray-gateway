import api from '@/services';
import { useMutation, useQuery } from 'react-query';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { ProductDeleteFormPropsRequest } from '@/services/product/delete';

const useProductDelete = ({modalClose, getData}: any) => {

  return useMutation({
    mutationKey: ['product-delete'],
    mutationFn : (payload: ProductDeleteFormPropsRequest) => api.deleteProduct({ payload }),
    onSuccess  : async (data) => {
      AlertSuccess("Data Deleted Successfully");
      getData();
      modalClose();
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message)
    },
  });
};

export default useProductDelete;
