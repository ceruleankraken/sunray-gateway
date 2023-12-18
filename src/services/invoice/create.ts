import { http } from '@/services/axios';
import { INVOICE_CREATE_PATH } from '@/configs/constants';

export interface LineInvoice {
  product_id  : string | undefined,
  qty         : number | undefined,
  price       : number | undefined,
  discount    : number | undefined,
  ispercentage: boolean
}

export interface InvoiceCreateFormPropsRequest {
  partner_id  : string | undefined,
  batchno     : string | undefined,
  pay_date    : number | undefined,
  ispercentage: number | undefined,
  isactive    : boolean,
  line        : LineInvoice[]
}

type InvoiceCreateProps = {
  payload: InvoiceCreateFormPropsRequest;
};

const createInvoice = async ({ payload }: InvoiceCreateProps) => {
  const { data } = await http.post(INVOICE_CREATE_PATH, payload);
  return data
};

const partnerCreateInvoice = {
  createInvoice,
};

export default partnerCreateInvoice;
