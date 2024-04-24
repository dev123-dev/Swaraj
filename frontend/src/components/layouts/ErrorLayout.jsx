import { Link, useRouteError } from "react-router-dom";

import "./ErrorLayout.css";

export default function ErrorLayout({ customError }) {
  const error = useRouteError() || customError;

  let errorContent;
  if (error.status === 404) {
    errorContent = "Page not found";
  } else if (error.status === 403) {
    errorContent = "You don't have access to this page";
  } else {
    console.error("Error:", error);
    errorContent = "Please try again later";
  }

  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error__title flex-center text-red">
          Uh oh! Something went wrong!
        </div>
        <div className="error__msg">
          {error.status}
          {error.status && <> &ndash;</>} {errorContent}
        </div>

        <Link
          to={error.status === 403 ? -1 || "/home" : "/home"}
          className="error-btn btn-primary_1 btn-green"
        >
          {error.status === 403 ? "Go back" : "Home"}
        </Link>
      </div>
    </div>
  );
}
