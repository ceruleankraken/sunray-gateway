import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { InvoiceEditFormPropsRequest } from '@/services/invoice/edit';

interface InvoiceEditStatusProps {
  payload   : InvoiceEditFormPropsRequest,
  invoice_id: string,
}


export const useInvoiceEditStatus = ({getData}: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['invoice-edit-status'],
    mutationFn: ({payload, invoice_id}: InvoiceEditStatusProps) => api.editInvoice({payload}, invoice_id),
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
