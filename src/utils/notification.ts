import { toast } from 'react-toastify';
import startCase from 'lodash/startCase';

export const AlertError = (message: string) => {
  return toast.error(startCase(message), {
    position       : "top-center",
    autoClose      : 5000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    draggable      : false,
    progress       : undefined,
    theme          : "colored",
  });
}

export const AlertWarning = (message: string) => {
  return toast.warning(startCase(message), {
    position       : "top-center",
    autoClose      : 5000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    draggable      : false,
    progress       : undefined,
    theme          : "colored",
  });
}

export const AlertInfo = (message: string) => {
  return toast.info(startCase(message), {
    position       : "top-center",
    autoClose      : 5000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    draggable      : false,
    progress       : undefined,
    theme          : "colored",
  });
}

export const AlertSuccess = (message: string) => {
  return toast.success(startCase(message), {
    position       : "top-center",
    autoClose      : 5000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    draggable      : false,
    progress       : undefined,
    theme          : "colored",
  });
}