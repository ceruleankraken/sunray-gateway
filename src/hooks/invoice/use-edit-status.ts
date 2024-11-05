import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';
import { InvoiceEditFormPropsRequest } from '@/services/invoice/edit';
import { InvoiceEditStatusPropsRequest } from '@/services/invoice/edit-status';

interface InvoiceEditStatusProps {
  closeModal: ()=>void,
  getData   : ()=>void,
}

export const useInvoiceEditStatus = ({getData, closeModal}: InvoiceEditStatusProps) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['invoice-edit-status'],
    mutationFn: (payload: InvoiceEditStatusPropsRequest) => api.editStatusInvoice({payload}),
    onSuccess: (data) => {
      AlertSuccess("Data updated successfully");
      getData();
      closeModal();
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message);
      getData();
    },
  });
};
