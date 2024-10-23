import { useLocation } from "react-router-dom";
import { ICONS } from "../../../assets";

const DashboardHeader = () => {
  const location = useLocation();

  const currentPath =
    location.pathname === "/" ? "" : `/ ${location.pathname.substring(1)}`;

  return (
    <div className="bg-white mb-6 py-5 px-7 border-b flex justify-between items-center">
      <div className="text-gray-600 font-medium">
        Dashboard <span className="text-black"> {currentPath}</span>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="rounded-md p-1 px-2 bg-none md:bg-secondary-10 flex gap-2 justify-center items-center">
          <img src={ICONS.InputField} alt="img" />
          <input
            type="search"
            placeholder="Search"
            className="border-0 hidden md:block outline-0 w-[350px] bg-transparent text-secondary-110 placeholder:text-secondary-110"
          />
        </div>
        <img src={ICONS.bell} alt="bell-icon" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default DashboardHeader;
