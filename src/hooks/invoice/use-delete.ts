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
import { InvoiceDeleteFormPropsRequest } from '@/services/invoice/delete';


export const useInvoiceDelete = ({getData}: any) => {
  const dispatch                  = useDispatch();
  const router                    = useRouter();

  return useMutation({
    mutationKey: ['invoice-delete'],
    mutationFn : (payload: InvoiceDeleteFormPropsRequest) => api.deleteInvoice({ payload }),
    onSuccess  : async (data) => {
      AlertSuccess("Data Deleted Successfully");
      getData();
      // router.replace('/');
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message)
    },
  });
};
