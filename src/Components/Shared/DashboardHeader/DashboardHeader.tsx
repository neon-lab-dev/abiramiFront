import { useLocation, useNavigate } from "react-router-dom";
import { ICONS } from "../../../assets";
import { useSearch } from "../../../context/SearchContext";
import { getSearchFunction } from "../../../utils/searchUtils";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Cookies from "js-cookie";
import Loader from "../../../lib/loader";

interface DashboardHeaderProps {
  HandleSidebar: (data: boolean) => void;
  callNav: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  HandleSidebar,
  callNav,
}) => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const { searchQuery, setSearchQuery, setSearchResults } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, [location]);
  // Split the pathname by "/" and filter out empty strings
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      setLoading(true);
      const searchFunction = getSearchFunction(location.pathname);
      if (searchFunction) {
        try {
          const results = await searchFunction(searchQuery);
          if (results.data.length === 0) {
            alert("No data found!!!");
            return;
          }
          setSearchResults(results);
        } catch (error: unknown) {
          type ErrorResponse = {
            status: number;
          };
          const err = error as ErrorResponse;
          if (err.status === 404) {
            alert("Data not found!!!");
            return;
          } else {
            console.error("Search API error:", error);
          }
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("No search function available for this route.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    Cookies.remove("token");
    navigate("/login");
  };

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
        {loading && (
          <>
            <div>
              <Loader w={5} h={5} />
            </div>
          </>
        )}
        <div className="rounded-md p-1 px-2 bg-none md:bg-secondary-10 flex gap-2 justify-center items-center">
          <img src={ICONS.InputField} alt="Search Icon" />
          <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="border-0 hidden md:block outline-0 md:w-[170px] lg:w-[200px] bg-transparent text-secondary-110 placeholder:text-secondary-110"
          />
        </div>
        {/* <img src={ICONS.bell} alt="bell-icon" className="cursor-pointer" /> */}
        <Button
          text="Logout"
          color="bg-primary-10 text-white "
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
