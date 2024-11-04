import { useLocation } from "react-router-dom";
import { ICONS } from "../../../assets";

interface DashboardHeaderProps {
  HandleSidebar: (data: boolean) => void;
  callNav: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  HandleSidebar,
  callNav,
}) => {
  const location = useLocation();

  // Split the pathname by "/" and filter out empty strings
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="bg-white mb-6 py-5 px-0 md:px-7 border-b flex justify-between items-center">
      <div className="text-[#1c1c1c66]  font-normal">
        {/* Conditional rendering based on screen size */}
        <span className="hidden font-semibold text-[14px] lg:block">
          Dashboard{" "}
          {/* Display each word with slashes, 10px space, and color logic */}
          {pathSegments.length > 0 && (
            <span className="inline-flex capitalize items-center whitespace-nowrap">
              {pathSegments.map((segment, index) => (
                <span key={index} className="inline-flex items-center">
                  <span
                    className={`${
                      index === pathSegments.length - 1
                        ? "text-black"
                        : "text-gray-500"
                    }`}
                  >
                    &nbsp; &nbsp; / &nbsp; &nbsp;
                    {segment}
                  </span>
                </span>
              ))}
            </span>
          )}
        </span>
        <span className="hidden md:block lg:hidden">Dashboard</span>

        {/* Show sidebar toggle icon on small screens */}
        <span
          className="block cursor-pointer md:hidden"
          onClick={() => HandleSidebar(!callNav)}
        >
          <img src={ICONS.ThreeLineIcon} alt="Menu Icon" />
        </span>
      </div>

      <div className="flex justify-center items-center gap-4">
        {/* Search bar with conditional display */}
        <div className="rounded-md p-1 px-2 bg-none md:bg-secondary-10 flex gap-2 justify-center items-center">
          <img src={ICONS.InputField} alt="Search Icon" />
          <input
            type="search"
            placeholder="Search"
            className="border-0 hidden md:block outline-0 md:w-[170px] lg:w-[200px] bg-transparent text-secondary-110 placeholder:text-secondary-110"
          />
        </div>
        <img src={ICONS.bell} alt="bell-icon" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default DashboardHeader;