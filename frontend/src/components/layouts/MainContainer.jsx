import { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import SettingsModal from "../modals/SettingsModal";
import useOutsideClick from "../../hooks/useOutsideClick";
import SidebarModal from "./sidebar/SidebarModal";
// import HomeIcon from "./sidebar/HomeIcon";
import "./MainContainer.css";

export default function MainContainer({ onGoBack, children, pageName }) {
  const wrappedRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.user);
  useOutsideClick(wrappedRef, () => setShowSettings(false));

  return (
    <Fragment>
      <SidebarModal
        onCancel={() => setShowModal(false)}
        showModal={showModal}
      />
      <div className="top-header ">
        <div className=" d-flex justify-content-end align-item-end topBar">
          <div className="mx-2 ">
            <Link className="topBarHead" to="">
              Dashboard
            </Link>
          </div>
          <div className="mx-2 ">
            <Link className="topBarHead">Property</Link>
          </div>
          <div className="mx-2 ">
            <Link className="topBarHead">Tenants</Link>
          </div>
          <div className="mx-2 ">
            <Link className="topBarHead">Reports</Link>
          </div>
        </div>

        <div className="row-gap-1">
          <div className="btn-menu">
            <Icon
              name="menu-outline"
              size="3rem"
              onClick={() => setShowModal(true)}
              color="#f8f9fb"
            />
          </div>
          {onGoBack && (
            <Icon
              title="Back"
              name="long-arrow-back"
              size="3rem"
              onClick={onGoBack}
              color="#f8f9fb"
            />
          )}
        </div>
        <div className="row-gap-1 ">
          <div className="main-container-home-icon">{/* <HomeIcon /> */}</div>
          <div
            className="profile"
            ref={wrappedRef}
            onClick={() => setShowSettings((ps) => !ps)}
          >
            <Icon
              name={
                showSettings ? "chevron-up-outline" : "chevron-down-outline"
              }
            />
            <div className="profile-details">
              <span className="profile-details_name">
                {user?.name.split(" ")[0]}
              </span>
              <span className="profile-details_post text-dark">
                {user?.role}
              </span>
            </div>
            <div className="profile-img-container">
              {user?.photo ? (
                <img
                  className="profile-img"
                  src={`${import.meta.env.VITE_IMAGE_URL}/users/${user?.photo}`}
                  alt={user?.name}
                />
              ) : (
                <div className="profile-letter flex-center">
                  {user?.name.slice(0, 1)}
                </div>
              )}
            </div>
            {showSettings && <SettingsModal />}
          </div>
        </div>
      </div>
      {children}
    </Fragment>
  );
}
