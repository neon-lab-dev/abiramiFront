import DashboardSidebar from "../Components/Shared/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../Components/Shared/DashboardHeader/DashboardHeader";
import { Outlet } from "react-router-dom";
import ClientListPage from "../pages/Clients/ListPage";
import PurchaseListPage from "../pages/Purchase/ListPage";
import InvoiceTable from "../Components/Invoices/InvoiceTable";
import InvoiceListPageTable from "../Components/Invoices/InvoiceListPageTable";

const Layout = () => {
  return (

    <div className="flex h-screen gap-7 w-full ">
      {/* Sidebar taking fixed width, allowing the rest of the screen to adjust */}
      <DashboardSidebar />
      
      {/* Main content area */}{/* Content section should scroll if there's overflow in y */}
      <div className="flex-1 flex flex-col overflow-y-scroll overflow-hidden w-full px-4 pr-0 md:px-0 md:pr-7">
        {/* Header stays at the top */}
        <DashboardHeader  />
        
        
        <div className="flex-1 ">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Layout;
