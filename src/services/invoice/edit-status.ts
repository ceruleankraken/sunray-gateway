import { http } from '@/services/axios';
import { INVOICE_EDIT_STATUS_PATH } from '@/configs/constants';

export interface InvoiceEditStatusPropsRequest {
  payloads: {
    docaction   : string,
  },
  invoice_id: string,
}

type InvoiceEditStatusProps = {
  payload: InvoiceEditStatusPropsRequest;
};

const editStatusInvoice = async ({payload: { payloads, invoice_id }}: InvoiceEditStatusProps) => {

  
  const { data } = await http.put(INVOICE_EDIT_STATUS_PATH+invoice_id, payloads,
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