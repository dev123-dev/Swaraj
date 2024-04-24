import Sidebar from "./Sidebar";
import ModalContainer from "../../modals/ModalContainer";
import "./SidebarModal.css";

export default function SidebarModal({ onCancel, showModal }) {
  return (
    <></>
    // <ModalContainer
    //   onCancel={onCancel}
    //   backdropClass={`sidebar-backdrop ${showModal && "backdrop-anime"}`}
    // >
    //   <div className={`sidebar-modal ${showModal && "sidebar-modal-show"}`}>
    //     <Sidebar />
    //   </div>
    // </ModalContainer>
  );
}
