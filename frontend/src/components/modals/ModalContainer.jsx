import { Fragment } from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";

export default function ModalContainer({ children, onCancel, backdropClass }) {
  const content = (
    <Fragment>
      {/* <Backdrop onClick={onCancel} backdropClass={backdropClass} /> */}
      {children}
    </Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}
