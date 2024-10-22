import { useState } from "react";
import { ICONS } from "../../../assets";

interface NavItem {
  icon: string;
  text: string;
}

const DashboardSidebar = () => {
  const [collapse, setCollapse] = useState(false);

  const navItems: NavItem[] = [
    {
      icon: ICONS.DashboardIcon,
      text: "Dashboard",
    },
    {
      icon: ICONS.ClientsIcon,
      text: "Clients",
    },
    {
      icon: ICONS.SuppliersIcon,
      text: "Suppliers",
    },
    {
      icon: ICONS.InvoicesIcon,
      text: "Invoices",
    },
    {
      icon: ICONS.InventoryIcon,
      text: "Inventory",
    },
    {
      icon: ICONS.PurchasesIcon,
      text: "Purchase",
    },
    {
      icon: ICONS.SettingsIcon,
      text: "Settings",
    },
  ];

  return (
    <div
      className={`${
        collapse ? "w-[80px]" : "w-[218px]"
      } px-4 py-7 border-r h-screen cursor-pointer flex flex-col justify-between items-center bg-primary-10`}
    >
      <div className="">
        {/* ----- there is logo content ------------  */}
        <div
          className={`mb-7 flex justify-between   ${
            collapse ? "flex-col gap-7 items-center" : "flex-row items-start"
          }`}
        >
          <div className={`flex justify-center items-center gap-4`}>
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
            alt="CollapseIcon"
            className={`cursor-pointer ${collapse ? "rotate-180" : "rotate-0"}`}
          />
        </div>
        {/* ---------- there is nav item work -----------  */}

        <div className="w-full">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="w-full p-3 gap-3 rounded-lg hover:bg-primary-20 flex justify-between items-center"
            >
              <div className="flex justify-center items-center gap-4">
                <img src={item.icon} alt="dashboard icons" className="w-auto" />
                <p className={`text-white ${collapse ? "hidden" : "block"} `}>
                  {item.text}
                </p>
              </div>
              <img
                src={ICONS.RightArrowIcon}
                alt="RightArrowIcon"
                className={`${collapse ? "hidden" : "block"}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ----------- admin part ------------  */}
      <div
        className={`w-full flex cursor-pointer justify-between  hover:bg-primary-20 p-3 rounded-md ${
          collapse ? "flex-col gap-2 items-center" : "flex-row items-start"
        }`}
      >
        <div className={`flex justify-center items-center gap-4`}>
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
          alt="CollapseIcon"
          className={`cursor-pointer `}
        />
      </div>
    </div>
  );
};

export default DashboardSidebar;
