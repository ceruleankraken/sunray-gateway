import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { PaymentEditFormPropsRequest } from '@/services/payment/edit';
import { PaymentEditStatusPropsRequest } from '@/services/payment/edit-status';

interface PaymentEditStatusProps {
  closeModal: ()=>void,
  getData   : ()=>void,
}


export const usePaymentEditStatus = ({getData, closeModal}: PaymentEditStatusProps) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['payment-edit-status'],
    mutationFn: (payload: PaymentEditStatusPropsRequest) => api.editStatusPayment({payload}),
    onSuccess: (data) => {
      AlertSuccess("Data updated successfully");
      getData();
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message);
      getData();
    },
  });
};
