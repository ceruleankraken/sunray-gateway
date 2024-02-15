import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { PaymentEditFormPropsRequest } from '@/services/payment/edit';

interface PaymentEditStatusProps {
  payload   : PaymentEditFormPropsRequest,
  payment_id: string,
}


export const usePaymentEditStatus = ({getData}: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['payment-edit-status'],
    mutationFn: ({payload, payment_id}: PaymentEditStatusProps) => api.editInvoice({payload}, payment_id),
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
