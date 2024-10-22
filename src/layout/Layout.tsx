import DashboardSidebar from "../Components/Shared/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../Components/Shared/DashboardHeader/DashboardHeader";
import { Outlet } from "react-router-dom";
import ClientListPage from "../pages/Clients/ListPage"
import PurchaseListPage from "../pages/Purchase/ListPage"

const Layout = () => {
 
  return (
    <div className="flex gap-7 w-full h-screen   ">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <Outlet />
        {/* <ClientListPage/> */}
        <PurchaseListPage/>
      </div>
    </div>
  );
};

export default Layout;
