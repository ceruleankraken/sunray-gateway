import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { InvoiceEditFormPropsRequest } from '@/services/invoice/edit';


export const useInvoiceEdit = ({closeModal, invoice_id, getData}: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['invoice-edit'],
    mutationFn: (payload: InvoiceEditFormPropsRequest) => api.editInvoice({payload}, invoice_id),
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
