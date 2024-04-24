import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useOutlet } from "react-router-dom";

import { useGetMeQuery, userApi } from "../../redux/apis/userApi";
import ErrorLayout from "../layouts/ErrorLayout";

export default function ProtectedRoute({
  reverse,
  restrictTo,
  restrictFrom,
  children,
}) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const outlet = useOutlet();
  const location = useLocation();
  const { isLoading, data } = useGetMeQuery();

  useEffect(() => {
    if (data && !user) dispatch(userApi.util.resetApiState());
  }, [data, user, dispatch]);

  if (isLoading) {
    // return <Loader />;
  } else if (data) {
    const loggedUser = data.data?.user;

    if (reverse) {
      return <Navigate to={"/home"} state={location} replace />;
    } else if (
      (restrictTo && !restrictTo.includes(loggedUser.role)) ||
      (restrictFrom && restrictFrom.includes(loggedUser.role))
    ) {
      return <ErrorLayout customError={{ status: 403 }} />;
    } else {
      return children || outlet;
    }
  } else {
    if (reverse) {
      return children || outlet;
    } else {
      return <Navigate to="/login" state={location} replace />;
    }
  }
}
