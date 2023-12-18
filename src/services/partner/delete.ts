import { http } from '@/services/axios';
import { PARTNER_CREATE_PATH, PARTNER_DELETE_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';


export interface PartnerDeleteFormPropsRequest {
  partner_id: string
}


type PartnerDeleteProps = {
  payload: PartnerDeleteFormPropsRequest
};

const deletePartner = async ({ payload }: PartnerDeleteProps) => {
  const partner_id = payload.partner_id;
  const { data }   = await http.delete(PARTNER_DELETE_PATH+partner_id);
  return data
};

const partnerDeleteServices = {
  deletePartner,
};

export default partnerDeleteServices;
