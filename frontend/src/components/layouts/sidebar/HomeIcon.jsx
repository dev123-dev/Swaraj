import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Icon from "../../ui/Icon";
import {
  resetCalender,
  setBookingId,
} from "../../../redux/slices/calenderSlice";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { setSidebarCalender } from "../../../redux/slices/userSlice";

export default function HomeIcon() {
  const [showModal, setShowModal] = useState(false);
  const { bookingId } = useSelector((state) => state.calender);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const homeHandler = () => {
    dispatch(setSidebarCalender(true));
    if (bookingId) {
      setShowModal(true);
    } else {
      dispatch(resetCalender());
      navigate("/home");
    }
  };

  const bookingSubmitHandler = () => {
    dispatch(setBookingId(null));
    setShowModal(false);
    dispatch(resetCalender());
    navigate("/home");
  };

  return (
    <Fragment>
      {showModal && (
        <ConfirmationModal
          type="warn"
          header="Active booking"
          msg="You are in the process of booking. Do you want to submit the booking?"
          onClose={() => setShowModal(false)}
          onConfirm={bookingSubmitHandler}
        />
      )}
      <Icon
        name="home"
        outerClass="btn-home btn-black"
        onClick={homeHandler}
        size="2.5rem"
        color="#f8f9fB"
      />
    </Fragment>
  );
}
