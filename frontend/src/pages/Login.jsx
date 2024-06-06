import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useLoginMutation } from "../redux/apis/userApi";

import logo from "../assets/logo.png";
import { setAlert } from "../redux/slices/userSlice";
// import Loader from "../components/ui/Loader";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const [login, { error, data, isLoading }] = useLoginMutation();

  useEffect(() => {
    if (error) dispatch(setAlert({ type: "error", msg: error }));

    if (data?.status === "SUCCESS") {
      dispatch(setAlert({ type: "success", msg: `Welcome to Swaraj...!` }));
    }
  }, [error, dispatch, data]);

  const inputHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="login-container">
      <form onSubmit={submitHandler} className="login-form">
        <div className="login-logo logo-bkground">
          <img src={logo} alt="logo" />
        </div>

        <div className="login-input">
          <label htmlFor="email">Username</label>
          <div className="form__input">
            <input
              required
              id="email"
              name="email"
              type="email"
              onChange={inputHandler}
              value={formData.email}
            />
          </div>
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <div className="form__input">
            <input
              required
              id="password"
              name="password"
              type="password"
              minLength={8}
              onChange={inputHandler}
              value={formData.password}
            />
          </div>
        </div>
        <div className="flex-center">
          <button
            className="btn-primary_1 btn-black btn-login flex-center"
            style={{ backgroundColor: "#095A4A" }}
            disabled={isLoading}
          >
            Log in
            {/* {isLoading && <Loader />} */}
          </button>
        </div>
        <div className="login-copyright-text ">
          &#169; {new Date().getFullYear()}{" "}
          <Link to="https://www.pinnacletechnologies.in/" target="_blank">
            Pinnacle Technologies
          </Link>
          , All Rights Reserved
        </div>
      </form>
    </div>
  );
}
