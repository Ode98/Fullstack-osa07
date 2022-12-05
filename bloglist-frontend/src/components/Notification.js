import { useSelector } from "react-redux";

const Notification = () => {
  const notificationMsg = useSelector((state) => state.notification);
  if (notificationMsg !== null) {
    return <div>{notificationMsg}</div>;
  }
  return <></>;
};

export default Notification;
