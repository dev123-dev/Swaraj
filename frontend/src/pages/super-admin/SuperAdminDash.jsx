// import MainContainer from "../../components/layouts/MainContainer";
// import Icon from "../../components/ui/Icon";
// import { useGetAllColorsQuery } from "../../redux/apis/colorApi";
// import { useGetAllInstitutionsQuery } from "../../redux/apis/institutionApi";
// import { useGetAllReservesQuery } from "../../redux/apis/reservationApi";
// import { useGetAllUsersQuery } from "../../redux/apis/userApi";
import "./SuperAdminDash.css";

export default function SuperAdminDash() {
  // const { data: dataInstitutes } = useGetAllInstitutionsQuery(null, {
  //   refetchOnMountOrArgChange: true,
  // });
  // const { data: dataReserves } = useGetAllReservesQuery(null, {
  //   refetchOnMountOrArgChange: true,
  // });
  // const { data: dataUsers } = useGetAllUsersQuery(null, {
  //   refetchOnMountOrArgChange: true,
  // });
  // const { data: dataColors } = useGetAllColorsQuery(null, {
  //   refetchOnMountOrArgChange: true,
  // });

  return (
    <>SuperAdmin</>
    // <MainContainer pageName="Dashboard">
    //   <div className="super-dash-grid">
    //     <div className="super-dash-item">
    //       <div className="super-dash-data">
    //         <Icon name="institute" size="5rem" noCursor color="#20262e" />
    //         Total Institutes : {dataInstitutes?.total}
    //       </div>
    //     </div>
    //     <div className="super-dash-item">
    //       <div className="super-dash-data">
    //         <Icon
    //           name="calender-outline"
    //           size="5rem"
    //           noCursor
    //           color="#20262e"
    //         />
    //         Total Reservations : {dataReserves?.total}
    //       </div>
    //     </div>
    //     <div className="super-dash-item">
    //       <div className="super-dash-data">
    //         <Icon name="person-outline" size="5rem" noCursor color="#20262e" />
    //         Total Users : {dataUsers?.total}
    //       </div>
    //     </div>
    //     <div className="super-dash-item">
    //       <div className="super-dash-data">
    //         <Icon
    //           name="color-palette-outline"
    //           size="5rem"
    //           noCursor
    //           color="#20262e"
    //         />
    //         Total Colors : {dataColors?.total}
    //       </div>
    //     </div>
    //   </div>
    // </MainContainer>
  );
}
