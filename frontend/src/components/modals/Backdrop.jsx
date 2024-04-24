import ReactDOM from "react-dom";

import "./Backdrop.css";

const Backdrop = ({ onClick, backdropClass }) => {
  const content = (
    <div className={`backdrop ${backdropClass}`} onClick={onClick}></div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
