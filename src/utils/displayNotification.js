import { showNotification } from "@mantine/notifications";

export const displayNotification = ({ mssg, color }) => {
  showNotification({
    autoClose: 5000,
    message: mssg,
    loading: false,
    color,
  });
};
