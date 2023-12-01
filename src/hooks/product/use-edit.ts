import { useMutation } from 'react-query';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { ProductEditFormPropsRequest } from '@/services/product/edit';


export const useProductEdit = ({closeModal, product_id, getData}: any) => {

  return useMutation({
    mutationKey: ['product-edit'],
    mutationFn: (payload: ProductEditFormPropsRequest) => api.editProduct({payload}, product_id),
    onSuccess: (data) => {
      AlertSuccess("Data edited successfully");
      closeModal();
      getData();
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message);
    },
  });
};
