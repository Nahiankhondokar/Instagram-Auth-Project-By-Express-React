import { toast } from 'react-toastify';



// create a toast
export const createSuccessToast = (msg) => {
    return toast.success(msg);
}

export const createErrorToast = (msg) => {
    return toast.error(msg);
}
