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
  header: HeaderInvoice,
  line  : LineInvoice[],
  file  : File | null,
}

type InvoiceCreateProps = {
  payload: InvoiceCreateFormPropsRequest;
};

const createInvoice = async ({ payload }: InvoiceCreateProps) => {

  var formData = new FormData()

  const newLine = payload.line.map( (val) => ({
    product_id  : val.product_id,
    product_name: val.product_name,
    qty         : parseInt(val.qty),
    price       : parseInt(val.price),
    discount    : parseFloat(val.discount),
    ispercentage: val.ispercentage,
  }))

  const textData = {
    header: {
      batchno     : payload.header.batchno,
      discount    : parseFloat(payload.header.discount),
      ispercentage: payload.header.ispercentage,
      partner_id  : payload.header.partner_id,
      pay_date    : payload.header.pay_date,
    },
    line: newLine,
  }

  formData.append("data", JSON.stringify(textData));
  formData.append("files", payload.file || "");

  const { data } = await http.post(INVOICE_CREATE_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data
};

const invoiceCreateServices = {
  createInvoice,
};

export default invoiceCreateServices;
