import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { InvoiceLineEditFormPropsRequest } from '@/services/invoice/edit-line';


export const useInvoiceLineEdit = ({closeModal, invoice_line_id, getData}: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['invoice-line-edit'],
    mutationFn: (payload: InvoiceLineEditFormPropsRequest) => api.editInvoiceLine({payload}, invoice_line_id),
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
