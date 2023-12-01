import { useMutation } from 'react-query';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { ProductCreateFormPropsRequest } from '@/services/product/create';


export const useProductCreate = ({closeModal, getData}: any) => {

  return useMutation({
    mutationKey: ['product-create'],
    mutationFn: (payload: ProductCreateFormPropsRequest) => api.createProduct({ payload }),
    onSuccess: (data) => {
      AlertSuccess("Data created successfully");
      closeModal()
      getData()
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message)
    },
  });
};
