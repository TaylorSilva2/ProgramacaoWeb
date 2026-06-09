interface NotificationProps {
  message: string;
  type: "success" | "error";
}

const Notification = ({ message, type }: NotificationProps) => {
  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
