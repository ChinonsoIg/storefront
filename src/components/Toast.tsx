import { toast, ToastPosition, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const customToast = (type: TypeOptions, message: string, position: ToastPosition) => {


  toast(message, {
    type,
    position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
}

export { customToast };