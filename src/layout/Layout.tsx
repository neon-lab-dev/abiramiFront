import DashboardSidebar from "../Components/Shared/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../Components/Shared/DashboardHeader/DashboardHeader";
import { Outlet } from "react-router-dom";
import ClientListPage from "../pages/Clients/ListPage";
import PurchaseListPage from "../pages/Purchase/ListPage";
import DashboardTable from "../Components/Dashboard/DashboardTable";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar taking fixed width, allowing the rest of the screen to adjust */}
      <DashboardSidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header stays at the top */}
        <DashboardHeader /> 
        <div className="flex-1 overflow-auto px-4 md:px-6 lg:px-8">
          <Outlet />
         
        </div>
      </div>
    </div>
  );
};

export default Layout;
