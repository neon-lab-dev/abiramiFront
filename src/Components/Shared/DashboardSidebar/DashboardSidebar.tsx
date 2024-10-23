import { useState } from "react";
import { ICONS } from "../../../assets";
import { Link, NavLink } from "react-router-dom";

interface NavItem {
  icon: string;
  text: string;
  path: string;
}


const DashboardSidebar = () => {
  const [collapse, setCollapse] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setActiveItem(activeItem === idx ? null : idx);
  };

  const navItems: NavItem[] = [
    { icon: ICONS.DashboardIcon, text: "Dashboard", path: "/" },
    { icon: ICONS.ClientsIcon, text: "Clients", path: "/clients" },
    { icon: ICONS.SuppliersIcon, text: "Suppliers", path: "/Suppliers" },
    { icon: ICONS.InvoicesIcon, text: "Invoices", path: "/Invoices" },
    { icon: ICONS.InventoryIcon, text: "Inventory", path: "/Inventory" },
    { icon: ICONS.PurchasesIcon, text: "Purchase", path: "/Purchase" },
    { icon: ICONS.SettingsIcon, text: "Settings", path: "/Settings" },
  ];

  return (
    <div
      className={`${
        collapse ? "w-[80px]" : "min-w-[218px]"
      } transition-all duration-300 ease-in-out px-4 py-7 border-r h-screen cursor-pointer flex flex-col justify-between items-center bg-primary-10 sticky top-0 left-0`}
    >
      <div className="flex flex-col ">
        {/* Logo Section */}
        <div
          className={`mb-7 flex justify-between ${
            collapse ? "flex-col gap-7 items-center" : "flex-row items-start"
          }`}
        >
          <div className="flex justify-center items-center gap-4">
            <img
              src={ICONS.logo}
              alt="abirami Enterprises logo"
              className="w-auto"
            />
            <p
              className={`text-white ${
                collapse ? "hidden" : "block"
              } text-[16px] leading-5`}
            >
              Abirami <br /> Enterprises
            </p>
          </div>
          <img
            onClick={() => setCollapse(!collapse)}
            src={ICONS.CollapseIcon}
            alt="collapsee Icon"
            className={`cursor-pointer ${collapse ? "rotate-180" : "rotate-0"}`}
          />
        </div>

        {/* Navigation Items */}
        <div className="w-full">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleItem(idx)}
              className={`w-full relative rounded-lg  hover:bg-primary-20 `}
            >
              <NavLink
                to={item.path}
                className={`p-3 w-full gap-3 flex  ${
                  item.text === "Suppliers" && activeItem === idx
                    ? "rounded-t-lg"
                    : "rounded-lg"
                } justify-between  items-center`}
              >
                <div className="flex justify-start items-center gap-4">
                  <img
                    src={item.icon}
                    alt={`${item.text} icon`}
                    className="w-auto"
                  />
                  <p className={`text-white ${collapse ? "hidden" : "block"}`}>
                    {item.text}
                  </p>
                </div>
                <img
                  src={ICONS.RightArrowIcon}
                  alt="Arrow Icon"
                  className={`ml-3 ${
                    collapse ? "hidden" : "block rotate-transition"
                  } ${
                    item.text === "Suppliers" && activeItem === idx
                      ? "rotate-90"
                      : "rotate-0"
                  }`}
                />
              </NavLink>

              {/* Dropdown for Suppliers */}
              {item.text === "Suppliers" && activeItem === idx && (
                <div
                  className={`w-full flex rounded-b-lg flex-col bg-primary-20 ${
                    collapse
                      ? "absolute z-50 w-[200px] rounded-md overflow-hidden"
                      : ""
                  }`}
                >
                  <Link to="/Suppliers/CreateSupplier">
                    <button className="p-3 border-0 text-white w-full">
                      Create Supplier
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="p-3 border-0 text-white w-full">
                      Option 2
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Admin Section */}
      <div
        className={`w-full flex cursor-pointer justify-between hover:bg-primary-20 p-3 rounded-md ${
          collapse ? "flex-col gap-2 items-center" : "flex-row items-start"
        }`}
      >
        <div className="flex justify-center items-center gap-4">
          <img src={ICONS.Admin} alt="Admin" className="w-auto" />
          <p
            className={`text-white ${
              collapse ? "hidden" : "block"
            } text-[16px] leading-5`}
          >
            Admin
          </p>
        </div>
        <img
          onClick={() => setCollapse(!collapse)}
          src={ICONS.RightArrowIcon}
          alt="collapsee Icon"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DashboardSidebar;