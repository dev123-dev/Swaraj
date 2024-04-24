import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import "./MainLayout.css";
import useScreenSize from "../../hooks/useScreenSize";

export default function MainLayout() {
  const { width } = useScreenSize();
  return (
    <Fragment>
      <div className="outer-container">
        {width > 992 && <Sidebar />}

        <div className="main-container">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
}
