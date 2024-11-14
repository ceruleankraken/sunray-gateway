import { http } from '@/services/axios';
import { PAYMENT_CREATE_PATH } from '@/configs/constants';

export interface HeaderPayment {
    // documenton  : string | undefined,
    // status      : string | undefined,
    batchno     : string,
    partner_id  : string,
    discount    : string,
    ispercentage: boolean,
    pay_date    : string
}
export interface LinePayment {
    payment_id  : string,
    invoice_id  : string,
    price       : string,
    discount    : string,
    ispercentage: boolean,
}

export interface PaymentCreateFormPropsRequest {
  header: HeaderPayment,
  line  : LinePayment[],
  file  : File | null,
}

type PaymentCreateProps = {
  payload: PaymentCreateFormPropsRequest;
};

const createPayment = async ({ payload }: PaymentCreateProps) => {

  // const { data } = await http.post(PAYMENT_CREATE_PATH, {
  //   header: {
  //     batchno     : payload.header.batchno,
  //     partner_id  : payload.header.partner_id,
  //     discount    : parseFloat(payload.header.discount),
  //     ispercentage: payload.header.ispercentage,
  //     pay_date    : payload.header.pay_date,
  //   },
  //   line: newLine,
  // });
  var formData = new FormData()

  const newLine = payload.line.map( (val) => ({
    payment_id  : val.payment_id,
    invoice_id  : val.invoice_id,
    price       : parseInt(val.price),
    discount    : parseFloat(val.discount),
    ispercentage: val.ispercentage,
  }))

  const textData = {
    header: {
      batchno     : payload.header.batchno,
      partner_id  : payload.header.partner_id,
      discount    : parseFloat(payload.header.discount),
      ispercentage: payload.header.ispercentage,
      pay_date    : payload.header.pay_date,
    },
    line: newLine,
  };

  formData.append("data", JSON.stringify(textData));
  formData.append("files", payload.file || "");

  const { data } = await http.post(PAYMENT_CREATE_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data
};

const paymentCreateServices = {
  createPayment,
};

export default paymentCreateServices;
