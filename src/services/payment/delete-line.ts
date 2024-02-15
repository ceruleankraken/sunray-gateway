import { http } from '@/services/axios';
import { PAYMENT_LINE_DELETE_PATH } from '@/configs/constants';


export interface PaymentLineDeleteFormPropsRequest {
  payment_line_id: string
}

type PaymentLineDeleteProps = {
  payload: PaymentLineDeleteFormPropsRequest
};

const deletePaymentLine = async ({ payload }: PaymentLineDeleteProps) => {
  const payment_line_id = payload.payment_line_id;
  const { data }        = await http.delete(PAYMENT_LINE_DELETE_PATH+payment_line_id);
  return data
};

const paymentLineDeleteServices = {
  deletePaymentLine,
};

export default paymentLineDeleteServices;
