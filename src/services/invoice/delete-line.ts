import { http } from '@/services/axios';
import { INVOICE_LINE_DELETE_PATH } from '@/configs/constants';


export interface InvoiceLineDeleteFormPropsRequest {
  invoice_line_id: string
}

type InvoiceLineDeleteProps = {
  payload: InvoiceLineDeleteFormPropsRequest
};

const deleteInvoiceLine = async ({ payload }: InvoiceLineDeleteProps) => {
  const invoice_line_id = payload.invoice_line_id;
  const { data }   = await http.delete(INVOICE_LINE_DELETE_PATH+invoice_line_id);
  return data
};

const invoiceLineDeleteServices = {
  deleteInvoiceLine,
};

export default invoiceLineDeleteServices;
