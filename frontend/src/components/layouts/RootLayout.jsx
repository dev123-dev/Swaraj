import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import reactLogo from "../../assets/react.svg";
import Alert from "../ui/Alert";

export default function RootLayout() {
  const { alertType, alertMsg } = useSelector((state) => state.user);

  return (
    <Fragment>
      <Alert type={alertType} msg={alertMsg} />
      <Outlet />
    </Fragment>
  );
}
