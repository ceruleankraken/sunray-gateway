import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { InvoiceEditFormPropsRequest } from '@/services/invoice/edit';

interface InvoiceEditProps {
  closeModal: ()=>void,
  invoice_id : string,
  getData    : ()=>void,
}


export const useInvoiceEdit = ({invoice_id, getData, closeModal}: InvoiceEditProps) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['invoice-edit'],
    mutationFn: (payload: InvoiceEditFormPropsRequest) => api.editInvoice({payload}, invoice_id),
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
