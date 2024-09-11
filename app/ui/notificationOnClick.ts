import { NotificationManager } from "react-notifications";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function notificationOnClick(type: string, message: string) {
  switch (type) {
    case "info":
      NotificationManager.info(message);
      break;
    case "success":
      toast.success(message, {
        toastId: message,
      });
      break;
    case "warning":
      toast.warning(message, {
        toastId: message,
      });
      break;
    case "error":
      toast.error(message, {
        toastId: message,
      });
      break;
  }
}
