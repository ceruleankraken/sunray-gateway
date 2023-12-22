import { http } from '@/services/axios';
import { INVOICE_CREATE_PATH } from '@/configs/constants';

export interface HeaderInvoice {
    discount    : number | undefined,
    batchno     : string | undefined,
    ispercentage: boolean
    partner_id  : string | undefined,
    pay_date    : string | undefined
}
export interface LineInvoice {
    product_id  : string | undefined,
    qty         : number | undefined,
    price       : number | undefined,
    discount    : number | undefined,
    ispercentage: boolean
}

export interface InvoiceCreateFormPropsRequest {
  header: HeaderInvoice
  line  : LineInvoice[]
}

type InvoiceCreateProps = {
  payload: InvoiceCreateFormPropsRequest;
};

const createInvoice = async ({ payload }: InvoiceCreateProps) => {
  const { data } = await http.post(INVOICE_CREATE_PATH, payload);
  return data
};

const invoiceCreateServices = {
  createInvoice,
};

export default invoiceCreateServices;
