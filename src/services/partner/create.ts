import { http } from '@/services/axios';
import { PARTNER_CREATE_PATH } from '@/configs/constants';
import { LoginFormPropsRequest } from '@/hooks/auth/use-login';
import { User } from '@/types/user';
import { PartnerCreateFormPropsRequest } from '@/modals/partner/create';

type PartnerCreateProps = {
  payload: PartnerCreateFormPropsRequest;
};

const createPartner = async ({ payload }: PartnerCreateProps) => {
  console.log("==========API PARTNER===============");
  console.log(payload);
  const { data } = await http.post(PARTNER_CREATE_PATH, payload);
  console.log(data);
  return data
};

const partnerCreateServices = {
  createPartner,
};

export default partnerCreateServices;
