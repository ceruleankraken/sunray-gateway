import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { PaymentCreateFormPropsRequest } from '@/services/payment/create';


export const usePaymentCreate = ({closeModal, getData}: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['payment-create'],
    mutationFn: (payload: PaymentCreateFormPropsRequest) => api.createPayment({ payload }),
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
