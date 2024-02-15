import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import {
  setUserAuth,
  setAccessToken,
  userLogout,
} from '@/stores/features/auth.slice';
import { useTypedSelector } from '../other/use-type-selector';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { PaymentLineDeleteFormPropsRequest } from '@/services/payment/delete-line';


export const usePaymentLineDelete = ({modalClose, updateTable}: any) => {
  const dispatch                  = useDispatch();
  const router                    = useRouter();

  return useMutation({
    mutationKey: ['payment-line-delete'],
    mutationFn : (payload: PaymentLineDeleteFormPropsRequest) => api.deletePaymentLine({ payload }),
    onSuccess  : async (data) => {
      AlertSuccess("Data Deleted Successfully");
      updateTable();
      modalClose();
      // router.replace('/');
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message)
    },
  });
};
