import { useSelector } from "react-redux";

// import SidebarMonth from "./SidebarMonth";
// import CategoryLevels from "./CategoryLevels";
import logo from "../../../assets/logo.png";
// import SidebarBottom from "./SidebarBottom";
// import HomeIcon from "./HomeIcon";
import "./Sidebar.css";
import { Fragment } from "react";
// import SuperMidLinks from "./SuperMidLinks";

export default function Sidebar() {
  const { user } = useSelector((state) => state.user);

  return (
    user && (
      <div className="sidebar-outer">
        <div className="sidebar">
          <div className="flex-between mb-1">
            <img className="swaraj-logo" src={logo} alt="Book Better Logo" />
            <div className="sidebar-home-icon">{/* <HomeIcon /> */}</div>
          </div>
          {/* <div className="horizontal-line mb-2"></div> */}
          {/* {user?.role !== "Super Admin" ? (
            <Fragment>
              <SidebarMonth />
              <CategoryLevels />
            </Fragment>
          ) : (
            <SuperMidLinks />
          )} */}
          {/* <SidebarBottom /> */}
        </div>
      </div>
    )
  );
}
