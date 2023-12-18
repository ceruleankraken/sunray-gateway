import { http } from '@/services/axios';
import { INVOICE_EDIT_PATH } from '@/configs/constants';

export interface InvoiceEditFormPropsRequest {
  // partner_id  : string | undefined,
  // batchno     : string | undefined,
  pay_date    : number | undefined,
  ispercentage: number | undefined,
  isactive    : boolean
}

type InvoiceEditProps = {
  payload: InvoiceEditFormPropsRequest;
};

const editInvoice = async ({payload}: InvoiceEditProps, invoice_id: string) => {
  const { data } = await http.put(INVOICE_EDIT_PATH+invoice_id, payload);
  return data
};

const invoiceEditServices = {
  editInvoice,
};

export default invoiceEditServices;