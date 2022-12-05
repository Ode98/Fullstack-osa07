const Notification = ({ message }) => {
  const style = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === "") {
    return null;
  }
  return (
    <div style={style} className="notification">
      {message}
    </div>
  );
};

export default Notification;
