import MainContainer from "../../components/layouts/MainContainer";
import Icon from "../../components/ui/Icon";
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
    <MainContainer pageName="Dashboard">
      <div className="super-dash-grid">Super dashbord</div>
    </MainContainer>
  );
}
