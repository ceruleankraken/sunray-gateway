import { http } from '@/services/axios';
import { PAYMENT_EDIT_STATUS_PATH } from '@/configs/constants';

export interface PaymentEditStatusPropsRequest {
  payloads: {
    docaction   : string,
  },
  payment_id: string,
}

type PaymentEditStatusProps = {
  payload: PaymentEditStatusPropsRequest;
};

const editStatusPayment = async ({payload: { payloads, payment_id }}: PaymentEditStatusProps) => {
  
  const { data } = await http.put(PAYMENT_EDIT_STATUS_PATH+payment_id, payloads,
    {
      headers: {
        'Content-Type' : 'application/json',
      }
    }
  );
  return data
};

const paymentEditStatusServices = {
  editStatusPayment,
};

export default paymentEditStatusServices;