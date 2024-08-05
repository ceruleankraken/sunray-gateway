import { http } from '@/services/axios';
import { INVOICE_EDIT_STATUS_PATH } from '@/configs/constants';

export interface InvoiceEditStatusPropsRequest {
  docaction   : string,
}

type InvoiceEditStatusProps = {
  payload: InvoiceEditStatusPropsRequest;
};

const editStatusInvoice = async ({payload}: InvoiceEditStatusProps, invoice_id: string) => {

  
  const { data } = await http.put(INVOICE_EDIT_STATUS_PATH+invoice_id, payload,
    {
      headers: {
        'Content-Type' : 'application/json',
      }
    }
  );
  return data
};
 
const invoiceEditStatusServices = {
  editStatusInvoice,
};

export default invoiceEditStatusServices;