import { useState } from "react";
import { ICONS } from "../../../assets";
import { Link, NavLink } from "react-router-dom";

interface NavItem {
  icon: string;
  text: string;
  path: string;
  children?: { icon: string; text: string; path: string }[];
}

interface DashboardHeaderProps {
  HandleSidebar: (data: boolean) => void;
  callNav: boolean;
}

const DashboardSidebar: React.FC<DashboardHeaderProps> = ({
  HandleSidebar,
  callNav,
}) => {
  const [collapse, setCollapse] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setActiveItem(activeItem === idx ? null : idx);
  };

  const navItems: NavItem[] = [
    { icon: ICONS.DashboardIcon, text: "Dashboard", path: "/" },
    {
      icon: ICONS.ClientsIcon,
      text: "Clients",
      path: "/clients",
      children: [
        // {
        //   icon: ICONS.ClientDetailsIcon,
        //   text: "Client Details",
        //   path: "/clients/Detailpage",
        // },
        {
          icon: ICONS.CreateClientIcon,
          text: "Create Client",
          path: "/clients/CreateClients",
        },
      ],
    },
    {
      icon: ICONS.SuppliersIcon,
      text: "Suppliers",
      path: "/suppliers",
      children: [
        {
          icon: ICONS.CreateSupplierIcon,
          text: "Create Supplier",
          path: "/suppliers/createsupplier",
        },
      ],
    },
    {
      icon: ICONS.InvoicesIcon,
      text: "Invoices",
      path: "/invoices",
      children: [
        {
          icon: ICONS.InvoicesDetails,
          text: "Invoice Details",
          path: "/invoices/Detailpage",
        },
        {
          icon: ICONS.CreateInvoice,
          text: "Create Invoice",
          path: "/invoices/CreateInvoices",
        },
      ],
    },
    { icon: ICONS.InventoryIcon, text: "Inventory", path: "/inventory" },
    {
      icon: ICONS.PurchasesIcon,
      text: "Purchase",
      path: "/purchase",
      children: [
        {
          icon: ICONS.CreatePurchaseIcon,
          text: "Create Purchase",
          path: "/purchase/createpurchase",
        },
      ],
    },
    { icon: ICONS.SettingsIcon, text: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={`${
        collapse ? "w-[80px]" : "min-w-[218px]"
      } transition-all duration-300 ease-in-out px-4 absolute md:static ${
        callNav ? "left-0" : "-left-[100%]"
      } py-7 border-r z-50 h-screen overflow-y-auto scroll-none flex flex-col justify-between items-center bg-primary-10`}
    >
      {/* Toggle Sidebar for Mobile */}
      <span
        onClick={() => HandleSidebar(!callNav)}
        className="absolute top-2 right-2 block md:hidden"
      >
        <img src={ICONS.CrossIcon} alt="Close Sidebar Icon" />
      </span>

      {/* Sidebar Content */}
      <div className="flex flex-col">
        {/* Logo Section */}
        <div
          className={`mb-7 flex ${
            collapse ? "flex-col gap-7 items-center" : "flex-row items-start"
          } justify-between`}
        >
          <div className="flex items-center gap-4">
            <img src={ICONS.logo} alt="logo" className="w-auto" />
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
            alt="Collapse Icon"
            className={`cursor-pointer ${collapse ? "rotate-180" : "rotate-0"}`}
          />
        </div>

        {/* Navigation Items */}
        <div className="w-full">
          {navItems.map((item, idx) => (
            <div key={idx} className="w-full">
              <NavLink
                to={item.path}
                className={`p-3 w-full flex gap-3 items-center justify-between rounded-lg hover:bg-primary-20 ${
                  item.children && activeItem === idx
                    ? "rounded-t-lg"
                    : "rounded-lg"
                }`}
                onClick={() => {
                  toggleItem(idx), HandleSidebar(!callNav);
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.icon}
                    alt={`${item.text} icon`}
                    className="w-auto"
                  />
                  <p className={`text-white ${collapse ? "hidden" : "block"}`}>
                    {item.text}
                  </p>
                </div>

                {/* Right Arrow Icon */}
                <img
                  src={ICONS.RightArrowIcon}
                  alt="Arrow Icon"
                  className={`ml-3 mt-1 ${
                    collapse ? "hidden" : "block rotate-transition"
                  } ${
                    item.children && activeItem === idx
                      ? "rotate-90"
                      : "rotate-0"
                  }`}
                />
              </NavLink>

              {/* Dropdown Items */}
              {item.children && activeItem === idx && (
                <div
                  className={`w-full flex flex-col bg-primary-20 rounded-b-lg ${
                    collapse ? "w-[200px]" : ""
                  }`}
                >
                  {item.children.map((child, childIdx) => (
                    <Link
                      to={child.path}
                      onClick={() => HandleSidebar(!callNav)}
                      key={childIdx}
                      className="flex p-3 items-center gap-4"
                    >
                      <img
                        src={child.icon}
                        alt={`${child.text} icon`}
                        className="w-auto"
                      />
                      <p
                        className={`text-white ${
                          collapse ? "hidden" : "block"
                        }`}
                      >
                        {child.text}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Admin Section */}
      <div
        className={`w-full flex cursor-pointer p-3 hover:bg-primary-20 rounded-md ${
          collapse ? "items-center flex-col gap-2" : "flex-row items-start"
        }`}
      >
        <div className="flex items-center gap-4">
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
          onClick={() => setCollapse(!collapse)}
          src={ICONS.RightArrowIcon}
          alt="Arrow Icon"
          className="cursor-pointer mt-1"
        />
      </div>
    </div>
  );
};

export default DashboardSidebar;