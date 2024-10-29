import { useState } from "react";
import { ICONS } from "../../../assets";
import { Link, NavLink } from "react-router-dom";

// Define the NavItem interface for the sidebar navigation items
interface NavItem {
  icon: string;
  text: string;
  path: string;
}

// Define the DashboardHeaderProps interface for the props passed to the component
interface DashboardHeaderProps {
  HandleSidebar: (data: boolean) => void; // Function to toggle sidebar visibility
  callNav: boolean; // State to check if the sidebar is currently visible
}

const DashboardSidebar: React.FC<DashboardHeaderProps> = ({
  HandleSidebar,
  callNav,
}) => {
  const [collapse, setCollapse] = useState(false); // State to control sidebar collapsee
  const [activeItem, setActiveItem] = useState<number | null>(null); // State to track active dropdown items

  // Function to toggle active items (used for dropdowns)
  const toggleItem = (idx: number) => {
    setActiveItem(activeItem === idx ? null : idx);
  };

  // Define the navigation items for the sidebar
  const navItems: NavItem[] = [
    { icon: ICONS.DashboardIcon, text: "Dashboard", path: "/" },
    { icon: ICONS.ClientsIcon, text: "Clients", path: "/clients" },
    // { icon: ICONS.SuppliersIcon, text: "Suppliers", path: "/Suppliers" },
    // { icon: ICONS.InvoicesIcon, text: "Invoices", path: "/Invoices" },
    // { icon: ICONS.InventoryIcon, text: "Inventory", path: "/Inventory" },
    // { icon: ICONS.PurchasesIcon, text: "Purchase", path: "/Purchase" },
    // { icon: ICONS.SettingsIcon, text: "Settings", path: "/Settings" },
    { icon: ICONS.SuppliersIcon, text: "Suppliers", path: "/suppliers" },
    { icon: ICONS.InvoicesIcon, text: "Invoices", path: "/invoices" },
    { icon: ICONS.InventoryIcon, text: "Inventory", path: "/inventory" },
    { icon: ICONS.PurchasesIcon, text: "Purchase", path: "/purchase" },
    { icon: ICONS.SettingsIcon, text: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={`${
        collapse ? "w-[80px]" : "min-w-[218px]" // Conditionally set width for collapseed sidebar
      } transition-all duration-300 ease-in-out px-4 absolute md:static ${
        callNav ? "left-0" : "-left-[100%]" // Handle visibility on mobile by toggling left position
      } py-7 border-r z-50 h-screen overflow-y-auto cursor-pointer flex flex-col justify-between items-center bg-primary-10`}
    >
      {/* Toggle sidebar visibility for mobile */}
      <span
        onClick={() => HandleSidebar(!callNav)}
        className="absolute top-2 right-2 block md:hidden"
      >
        <img src={ICONS.CrossIcon} alt="Close Sidebar Icon" />
      </span>

      {/* Sidebar content starts */}
      <div className="flex flex-col ">
        {/* Logo Section */}
        <div
          className={`mb-7 flex justify-between ${
            collapse ? "flex-col gap-7 items-center" : "flex-row items-start"
          }`}
        >
          {/* Logo and text */}
          <div className="flex justify-center items-center gap-4">
            <img src={ICONS.logo} alt="logo" className="w-auto" />
            <p
              className={`text-white ${
                collapse ? "hidden" : "block"
              } text-[16px] leading-5`}
            >
              Abirami <br /> Enterprises
            </p>
          </div>

          {/* collapsee button */}
          <img
            onClick={() => setCollapse(!collapse)} // collapsee or expand the sidebar
            src={ICONS.CollapseIcon}
            alt="collapsee Icon"
            className={`cursor-pointer ${collapse ? "rotate-180" : "rotate-0"}`} // Rotate icon based on collapsee state
          />
        </div>

        {/* Navigation Items */}
        <div className="w-full">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              // onClick={() => toggleItem(idx)} // Toggle active item for dropdown functionality
              onClick={() => {
                toggleItem(idx), HandleSidebar(!callNav);
              }}
              className={`w-full relative rounded-lg hover:bg-primary-20`} // Apply hover effect for items
            >
              <NavLink
                // onClick={() => HandleSidebar(!callNav)}
                to={item.path} // Set the path for navigation
                className={`p-3 w-full gap-3 flex ${
                  item.text === "Suppliers" && activeItem === idx
                    ? "rounded-t-lg" // If the dropdown is active, round the top corners only
                    : "rounded-lg" // Otherwise, round the entire item
                } justify-between items-center`}
              >
                {/* Icon and text for each nav item */}
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

                {/* Arrow icon for dropdown */}
                <img
                  src={ICONS.RightArrowIcon}
                  alt="Arrow Icon"
                  className={`ml-3 mt-1 ${
                    collapse ? "hidden" : "block rotate-transition"
                  } ${
                    (item.text === "Suppliers" && activeItem === idx) ||
                    (item.text === "Purchase" && activeItem === idx)
                      ? "rotate-90" // Rotate arrow for active dropdown
                      : "rotate-0" // Default rotation for non-active items
                  }`}
                />
              </NavLink>

              {/* Dropdown for Suppliers section */}
              {item.text === "Suppliers" && activeItem === idx && (
                <div
                  onClick={() => HandleSidebar(!callNav)}
                  className={`w-full flex rounded-b-lg flex-col bg-primary-20 ${
                    collapse
                      ? "absolute z-50 w-[200px] rounded-md overflow-hidden" // For collapsed view, display dropdown as floating
                      : ""
                  }`}
                >
                  {/* Dropdown options */}
                  <Link to="/suppliers/createsupplier">
                    <div className="flex p-3 justify-start items-center gap-4">
                      <img
                        src={ICONS.CreateSupplierIcon}
                        alt={`${item.text} icon`}
                        className="w-auto"
                      />
                      <p
                        className={`text-white ${
                          collapse ? "hidden" : "block"
                        }`}
                      >
                        Create Supplier
                      </p>
                    </div>
                  </Link>
                </div>
              )}
              {/* Dropdown for Clients */}
              {item.text === "Clients" && activeItem === idx && (
                <div
                  className={`w-full flex rounded-b-lg flex-col bg-primary-20 ${
                    collapse
                      ? "absolute z-50 w-[200px] rounded-md overflow-hidden"
                      : ""
                  }`}
                >
                  <Link to="/clients/Detailpage">
                    <button className="p-3 border-0 text-white w-full">
                      Client Detail
                    </button>
                  </Link>
                  <Link to="/clients/CreateClients">
                    <button className="p-3 border-0 text-white w-full">
                      Create Client
                    </button>
                  </Link>
                </div>
              )}
              {/* Dropdown for Invoices */}
              {item.text === "Invoices" && activeItem === idx && (
                <div
                  className={`w-full flex rounded-b-lg flex-col bg-primary-20 ${
                    collapse
                      ? "absolute z-50 w-[200px] rounded-md overflow-hidden"
                      : ""
                  }`}
                >
                  <Link to="/Invoices/Detailpage">
                    <button className="p-3 border-0 text-white w-full">
                      Invoice Detail
                    </button>
                  </Link>
                  <Link to="/Invoices/CreateInvoices">
                    <button className="p-3 border-0 text-white w-full">
                      Create Invoice
                    </button>
                  </Link>
                </div>
              )}
              {/* Dropdown for Purchase */}
              {item.text === "Purchase" && activeItem === idx && (
                <div
                  onClick={() => HandleSidebar(!callNav)}
                  className={`w-full flex rounded-b-lg flex-col bg-primary-20 ${
                    collapse
                      ? "absolute z-50 w-[200px] rounded-md overflow-hidden"
                      : ""
                  }`}
                >
                  <Link to="/purchase/createpurchase">
                    <div className="flex p-3 justify-start items-center gap-4">
                      <img
                        src={ICONS.CreatePurchaseIcon}
                        alt={`${item.text} icon`}
                        className="w-auto"
                      />
                      <p
                        className={`text-white ${
                          collapse ? "hidden" : "block"
                        }`}
                      >
                        Create Purchase
                      </p>
                    </div>
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
        {/* Admin icon and label */}
        <div className="flex justify-center items-center gap-4">
          <img src={ICONS.Admin} alt="Admin Icon" className="w-auto" />
          <p
            className={`text-white ${
              collapse ? "hidden" : "block"
            } text-[16px] leading-5`}
          >
            Admin
          </p>
        </div>
        <img
          onClick={() => setCollapse(!collapse)} // Toggle collapsee/expand on click
          src={ICONS.RightArrowIcon}
          alt="Arrow Icon"
          className="cursor-pointer mt-1"
        />
      </div>
    </div>
  );
};

export default DashboardSidebar;
