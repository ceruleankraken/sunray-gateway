import { http } from '@/services/axios';
import { PARTNER_CREATE_PATH, PARTNER_EDIT_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';
import { PartnerCreateFormPropsRequest } from '@/modals/partner/create';
import { PartnerEditFormPropsRequest } from '@/modals/partner/edit';

type PartnerEditProps = {
  payload: PartnerEditFormPropsRequest;
};

const editPartner = async ({payload}: PartnerEditProps, partner_id: string) => {
  console.log("==========EDIT PARTNER===============");
  console.log(payload);
  // const apiData = payload.payload
  const { data } = await http.put(PARTNER_EDIT_PATH+partner_id, payload);
  console.log(data);
  return data
};

const partnerEditServices = {
  editPartner,
};

export default partnerEditServices;