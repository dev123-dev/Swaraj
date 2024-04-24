import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";

import { clearAlert } from "../../redux/slices/userSlice";
import "./Alert.css";

export default function Alert({ type, msg, onClear }) {
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type && msg) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch(clearAlert());
        if (onClear) onClear();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [msg, type, dispatch, onClear]);

  let alertColor;
  if (type === "error") {
    alertColor = "bg-red";
  } else if (type === "success") {
    alertColor = "bg-green";
  }

  const content = (
    <div className={`alert ${alertColor}`}>
      {msg || (type === "error" && "Something went very wrong!")}
    </div>
  );

  return (
    showAlert &&
    ReactDOM.createPortal(content, document.getElementById("alert-modal-hook"))
  );
}
