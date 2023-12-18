import { http } from '@/services/axios';
import { INVOICE_DELETE_PATH } from '@/configs/constants';


export interface InvoiceDeleteFormPropsRequest {
  invoice_id: string
}

type InvoiceDeleteProps = {
  payload: InvoiceDeleteFormPropsRequest
};

const deleteInvoice = async ({ payload }: InvoiceDeleteProps) => {
  const invoice_id = payload.invoice_id;
  const { data }   = await http.delete(INVOICE_DELETE_PATH+invoice_id);
  return data
};

const invoiceDeleteServices = {
  deleteInvoice,
};

export default invoiceDeleteServices;
