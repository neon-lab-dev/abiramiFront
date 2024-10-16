import DashboardSidebar from "../Components/Shared/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../Components/Shared/DashboardHeader/DashboardHeader";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex gap-7 w-full h-full">
      <DashboardSidebar />
      <div className="">
        <DashboardHeader />
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;
