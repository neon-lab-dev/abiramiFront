import DashboardSidebar from "../Components/Shared/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../Components/Shared/DashboardHeader/DashboardHeader";
import Table from "../Components/Shared/Table/Table";
import DownloadButton from "../Components/Shared/Table/DownloadExcelBtn";
import { Outlet } from "react-router-dom";
import { ICONS } from "../assets";
import ClientListPage from "../pages/Clients/ListPage"

const Layout = () => {
  // const data = [
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  //   { name: "John", age: 28, location: "New York", lcation: "New York" },
  //   { name: "Jane", age: 25, location: "San Francisco", lcation: "New York" },
  //   { name: "Doe", age: 35, location: "Chicago", lcation: "New York" },
  // ];

  // const columns = [
  //   { header: "Name", accessor: "name", cellClassName: "text-red-500",icon: ICONS.downArrow}, // Example style for Name column
  //   { header: "Age", accessor: "age", cellClassName: "text-green-500" }, // Example style for Age column
  //   {
  //     header: "Location",
  //     accessor: "location",
  //     cellClassName: "text-blue-500",
  //   }, // Example style for Location column
  // ];

  return (
    <div className="flex gap-7 w-full h-full   ">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <Outlet />
        <ClientListPage/>

      </div>
    </div>
  );
};

export default Layout;
