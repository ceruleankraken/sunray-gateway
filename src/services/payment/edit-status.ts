import { http } from '@/services/axios';
import { PAYMENT_EDIT_STATUS_PATH } from '@/configs/constants';

export interface PaymentEditStatusPropsRequest {
  docaction   : string,
}

type PaymentEditStatusProps = {
  payload: PaymentEditStatusPropsRequest;
};

const editStatusPayment = async ({payload}: PaymentEditStatusProps, payment_id: string) => {
  
  const { data } = await http.put(PAYMENT_EDIT_STATUS_PATH+payment_id, payload,
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