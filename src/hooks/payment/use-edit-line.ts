import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { PaymentLineEditFormPropsRequest } from '@/services/payment/edit-line';


export const usePaymentLineEdit = ({closeModal, payment_line_id, getData}: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['payment-line-edit'],
    mutationFn: (payload: PaymentLineEditFormPropsRequest) => api.editPaymentLine({payload}, payment_line_id),
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
