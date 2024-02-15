import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { PaymentEditFormPropsRequest } from '@/services/payment/edit';

interface PaymentEditProps {
  closeModal: ()=>void,
  payment_id : string,
  getData    : ()=>void,
}


export const usePaymentEdit = ({payment_id, getData, closeModal}: PaymentEditProps) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['payment-edit'],
    mutationFn: (payload: PaymentEditFormPropsRequest) => api.editPayment({payload}, payment_id),
    onSuccess: (data) => {
      AlertSuccess("Data edited successfully");
      getData();
      closeModal();
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message);
    },
  });
};
