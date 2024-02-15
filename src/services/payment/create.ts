import { http } from '@/services/axios';
import { PAYMENT_CREATE_PATH } from '@/configs/constants';

export interface HeaderPayment {
    // documenton  : string | undefined,
    // status      : string | undefined,
    batchno     : string,
    partner_id  : string,
}
export interface LinePayment {
    payment_id  : string,
    invoice_id  : string,
    price       : string,
    discount    : string,
    ispercentage: boolean,
}

export interface PaymentCreateFormPropsRequest {
  header: HeaderPayment
  line  : LinePayment[]
}

type PaymentCreateProps = {
  payload: PaymentCreateFormPropsRequest;
};

const createPayment = async ({ payload }: PaymentCreateProps) => {

  const newLine = payload.line.map( (val) => ({
    payment_id  : val.payment_id,
    invoice_id  : val.invoice_id,
    price       : parseInt(val.price),
    discount    : parseFloat(val.discount),
    ispercentage: val.ispercentage,
  }))
  const { data } = await http.post(PAYMENT_CREATE_PATH, {
    header: {
      batchno     : payload.header.batchno,
      partner_id  : payload.header.partner_id,
    },
    line: newLine,
  });
  return data
};

const paymentCreateServices = {
  createPayment,
};

export default paymentCreateServices;
