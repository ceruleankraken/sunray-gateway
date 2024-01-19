import { http } from '@/services/axios';
import { INVOICE_LINE_EDIT_PATH } from '@/configs/constants';

export interface InvoiceLineEditFormPropsRequest {
  invoice_id  : string,
  product_id  : string,
  product_name: string,
  qty         : string,
  price       : string,
  discount    : string,
  ispercentage: boolean
}

type InvoiceLineEditProps = {
  payload: InvoiceLineEditFormPropsRequest;
};

const editInvoiceLine = async ({payload}: InvoiceLineEditProps, invoice_line_id: string) => {
  const { data } = await http.put(INVOICE_LINE_EDIT_PATH+invoice_line_id, 
    {
      invoice_id  : payload.invoice_id,
      product_id  : payload.product_id,
      qty         : parseInt(payload.qty),
      price       : parseInt(payload.price),
      discount    : parseFloat(payload.discount),
      ispercentage: payload.ispercentage,
    });
  return data
};

const invoiceLineEditServices = {
  editInvoiceLine,
};

export default invoiceLineEditServices;