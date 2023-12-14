import { http } from '@/services/axios';
import { PARTNER_CREATE_PATH, PARTNER_EDIT_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';

export interface PartnerEditFormPropsRequest {
  name     : string | undefined,
  bp_code  : string | undefined,
  dn_amount: number | undefined,
  cn_amount: number | undefined,
  isactive : boolean | undefined,
}

type PartnerEditProps = {
  payload: PartnerEditFormPropsRequest;
};

const editPartner = async ({payload}: PartnerEditProps, partner_id: string) => {
  const { data } = await http.put(PARTNER_EDIT_PATH+partner_id, payload);
  console.log(data);
  return data
};

const partnerEditServices = {
  editPartner,
};

export default partnerEditServices;