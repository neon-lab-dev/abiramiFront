import DashboardSidebar from "../Components/Shared/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../Components/Shared/DashboardHeader/DashboardHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { set } from "zod";
const Layout = () => {
  const [callNav, setCallNav] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const HandleSidebar = (data: boolean) => {
    setCallNav(data);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
    setIsLogged(true);
  }, [navigate]);
  if (isLogged) {
    return (
      <div className="flex h-screen gap-7 w-full">
        {/* Sidebar taking fixed width, allowing the rest of the screen to adjust */}
        <DashboardSidebar HandleSidebar={HandleSidebar} callNav={callNav} />

        {/* Main content area */}
        {/* Content section should scroll if there's overflow in y */}
        <div className="flex-1 flex flex-col overflow-y-scroll overflow-hidden w-full px-4 pr-4 md:px-0 md:!pr-7">
          {/* Header stays at the top */}

          <div className="flex-1 pb-2 ">
            <DashboardHeader HandleSidebar={HandleSidebar} callNav={callNav} />

            <div className="flex-1 ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Layout;
