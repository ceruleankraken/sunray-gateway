import { http } from '@/services/axios';
import { INVOICE_CREATE_PATH } from '@/configs/constants';

export interface HeaderInvoice {
    // documenton  : string | undefined,
    // status      : string | undefined,
    batchno     : string,
    discount    : string,
    ispercentage: boolean,
    partner_id  : string,
    pay_date    : string
}
export interface LineInvoice {
    product_id  : string,
    product_name: string,
    qty         : string,
    price       : string,
    discount    : string,
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
