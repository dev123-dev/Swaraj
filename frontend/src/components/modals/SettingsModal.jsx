import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../../redux/apis/userApi";
import "./SettingsModal.css";

export default function SettingsModal() {
  const navigate = useNavigate();
  const [logout, { data }] = useLogoutMutation();

  useEffect(() => {
    if (data?.status === "SUCCESS") navigate("/login");
  }, [data, navigate]);

  return (
    <div className="settings-container">
      <button
        className="setting-item"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}
