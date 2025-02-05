import DashboardSidebar from "../Components/Shared/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../Components/Shared/DashboardHeader/DashboardHeader";
import { Outlet, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../lib/loader";
const Layout = () => {
  const { admin, loading } = useContext(AuthContext);
  // const [loading, setLoading] = useState<boolean>(true);
  const [callNav, setCallNav] = useState(false);
  // const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const HandleSidebar = (data: boolean) => {
    setCallNav(data);
  };

  if (loading)
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  if (!admin ) {
    navigate("/login");
  }

  // useEffect(() => {
  //   const verifyAdmin = async () => {
  //     try {
  //       const response = await verifyAdminByToken(token);
  //       if (response.status === 200) {
  //         setIsLogged(true);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   verifyAdmin();
  // }, [loading]);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex h-screen gap-7 w-full">
          {/* Sidebar taking fixed width, allowing the rest of the screen to adjust */}
          <DashboardSidebar HandleSidebar={HandleSidebar} callNav={callNav} />

          {/* Main content area */}
          {/* Content section should scroll if there's overflow in y */}
          <div className="flex-1 flex flex-col overflow-y-scroll overflow-hidden w-full px-4 pr-4 md:px-0 md:!pr-7">
            {/* Header stays at the top */}

            <div className="flex-1 pb-2 ">
              <DashboardHeader
                HandleSidebar={HandleSidebar}
                callNav={callNav}
              />

              <div className="flex-1 ">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
