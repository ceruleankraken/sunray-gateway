import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import api from '@/services';
import { AlertError, AlertSuccess } from '@/utils/notification';

export interface PartnerCreateFormPropsRequest {
  name     : string,
  bpcode   : string,
  dn_amount: number,
  cn_amount: number,
  isactive : boolean,
}

export const usePartnerCreate = ({modalOnClose}: any) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['partner-create'],
    mutationFn: (payload: PartnerCreateFormPropsRequest) => api.createPartner({ payload }),
    onSuccess: (data) => {
      AlertSuccess("Data created successfully");
      modalOnClose();
    },
    onError: (data: any) => {
      let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(message)
      console.log(data);
    },
  });
};
