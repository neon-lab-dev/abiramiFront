import React, { useState } from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";
import DownloadButton from "../Shared/Table/DownloadExcelBtn";
import Button from "../Shared/Button/Button";

// Define a type for the row data
interface Invoice {
  invoice_id: string;
  invoice_status: "PAID" | "PENDING" | "DRAFT";
  client: string;
  invoice_type: "Cheque Invoice" | "Quote Invoice" | "Tax invoice";
  total_amount: number;
  tax: number;
  created_date: Date;
  i1: boolean;
  i2: boolean;
  i3: boolean;
  iconsOrder: string[];
}

const InvoiceTable: React.FC = () => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const formatCurrency = (value: number) => {
    return `₹ ${value.toLocaleString()}`;
  };
  const removeFilter = () => {
    setStatusFilter("");
    setTypeFilter("");
  };

  const icons = {
    i1: ICONS.blueTick,
    i2: ICONS.greenCross,
    i3: ICONS.deleteRed,
  };

  const data: Invoice[] = [
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "PAID",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type: "Cheque Invoice",
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax: 985735689,
      i1: true,
      i2: false,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "PENDING",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type: "Cheque Invoice",
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax: 985735689,
      i1: true,
      i2: false,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "PAID",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type: "Quote Invoice",
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax: 985735689,
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "PAID",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type: "Cheque Invoice",
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax: 985735689,
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "PENDING",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type: "Tax invoice",
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax: 985735689,
      i1: true,
      i2: false,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "PENDING",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type: "Tax invoice",
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax: 985735689,
      i1: true,
      i2: false,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "PENDING",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type: "Quote Invoice",
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax: 985735689,
      i1: true,
      i2: false,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "PENDING",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type: "Tax invoice",
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax: 985735689,
      i1: true,
      i2: false,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "DRAFT",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type: "Tax invoice",
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax: 985735689,
      i1: true,
      i2: false,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "DRAFT",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type: "Quote Invoice",
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax: 985735689,
      i1: true,
      i2: false,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },

    {
      invoice_id: "kjsdgnbj",
      invoice_status: "DRAFT",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type: "Quote Invoice",
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax: 985735689,
      i1: true,
      i2: false,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "DRAFT",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type: "Quote Invoice",
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax: 985735689,
      i1: true,
      i2: false,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
  ];

  const columns = [
    {
      header: "Invoice Id",
      accessor: "invoice_id",
      cellClassName: " text-blue-20 ",
      width: "430px",
    },
    {
      header: (
        <div className="relative">
          <button className="" onClick={() => setDropdownOpen1(!dropdownOpen1)}>
            <div className="flex items-center justify-between w-[112px] font-normal text-[14px] leading-[20px] text-neutral-85">
              <p>Status </p>
              <img src={ICONS.downArrow} className="mr-2 w-5 h-5" />
            </div>
          </button>
          {dropdownOpen1 && (
            <div className="absolute bg-white mt-1 z-100 rounded-[6px] shadow-dropdown">
              <button
                onClick={() => {
                  setStatusFilter("PAID");
                  setDropdownOpen1(false);
                }}
                className={`block w-full text-left p-2 hover:bg-customBlue-20 hover:text-white py-[7px] px-4 ${
                  statusFilter === "PAID"
                    ? "text-white bg-customBlue-20"
                    : "text-neutral-100"
                }`}
              >
                Paid
              </button>
              <button
                onClick={() => {
                  setStatusFilter("PENDING");
                  setDropdownOpen1(false);
                }}
                className={`block w-full text-left p-2  hover:bg-customBlue-20 hover:text-white py-[7px] px-4 ${
                  statusFilter === "PENDING"
                    ? "text-white bg-customBlue-20"
                    : "text-neutral-100"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => {
                  setStatusFilter("DRAFT");
                  setDropdownOpen1(false);
                }}
                className={`block w-full text-left p-2 hover:bg-customBlue-20 hover:text-white py-[7px] px-4 ${
                  statusFilter === "DRAFT"
                    ? "text-white bg-blue-20"
                    : "text-neutral-100"
                }`}
              >
                Draft
              </button>
            </div>
          )}
        </div>
      ),
      accessor: "invoice_status",
      cellRenderer: (row: Invoice) => {
        let statusClass = "";

        // Conditional coloring based on invoice_status
        if (row.invoice_status === "PAID") {
          statusClass =
            "text-neutral-90 bg-neutral-50 h-[28px] py-[2px] px-[12px] rounded-[12px] font-sans text-[12px] font-normal leading-[20px] text-left"; // Green for PAID
        } else if (row.invoice_status === "PENDING") {
          statusClass =
            "text-yellow-500 bg-secondary-35 h-[28px]  py-[2px] px-[12px] rounded-[12px] font-sans text-[12px] font-normal leading-[20px] text-left"; // Yellow for PENDING (PENDING)
        } else if (row.invoice_status === "DRAFT") {
          statusClass =
            "text-gray-500  font-sans text-[12px] font-normal leading-[20px] text-left"; // Gray for DRAFT
        }

        return <span className={statusClass}>{row.invoice_status}</span>;
      },
      width: "112px",
    },

    {
      header: "Client",
      accessor: "client",
      cellClassName: "text-black",
      icon1: ICONS.search,
      width: "200px",
    },
    {
      header: (
        <div className="relative">
          <button className="" onClick={() => setDropdownOpen2(!dropdownOpen2)}>
            <div className="flex items-center justify-between w-[176px] font-normal text-[14px] leading-[20px] text-neutral-85">
              <p>Invoice Type</p>
              <img src={ICONS.downArrow} className="mr-2 w-5 h-5" />
            </div>
          </button>
          {dropdownOpen2 && (
            <div className="absolute bg-white mt-1 z-50 rounded-[6px] shadow-dropdown">
              <button
                onClick={() => {
                  setTypeFilter("Cheque Invoice");
                  setDropdownOpen2(false);
                }}
                className={`block w-full text-left p-2  hover:bg-customBlue-20 hover:text-white py-[7px] px-4 ${
                  typeFilter === "Cheque Invoice"
                    ? "text-white bg-customBlue-20"
                    : "text-neutral-100"
                }`}
              >
                Cheque Invoice
              </button>
              <button
                onClick={() => {
                  setTypeFilter("Quote Invoice");
                  setDropdownOpen2(false);
                }}
                className={`block w-full text-left p-2 hover:bg-customBlue-20 hover:text-white py-[7px] px-4 ${
                  typeFilter === "Quote Invoice"
                    ? "text-white bg-customBlue-20"
                    : "text-neutral-100"
                }`}
              >
                Quote Invoice
              </button>
              <button
                onClick={() => {
                  setTypeFilter("Tax invoice");
                  setDropdownOpen2(false);
                }}
                className={`block w-full text-left p-2 hover:bg-customBlue-20 hover:text-white py-[7px] px-4 ${
                  typeFilter === "Tax invoice"
                    ? "text-white bg-customBlue-20"
                    : "text-neutral-100"
                }`}
              >
                Tax invoice
              </button>
            </div>
          )}
        </div>
      ),

      accessor: "invoice_type",
      cellClassName: "text-black",
      width: "175px",
    },
    {
      header: "Total Amount",
      accessor: "total_amount",
      cellRenderer: (row: Invoice) => {
        // console.log(row.total_amount);
        return (
          <span className="text-black">{formatCurrency(row.total_amount)}</span>
        );
      },
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "175px",
    },
    {
      header: "Tax",
      accessor: "tax",
      cellRenderer: (row: Invoice) => {
        // console.log(row.tax);
        return <span className="text-black">{formatCurrency(row.tax)}</span>;
      },
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "111px",
    },

    {
      header: "Created Date",
      accessor: "created_date",
      type: "date",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      format: (value: Date) =>
        value.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      icon2: ICONS.downArrow2,
      icon1: ICONS.upArrow,
      width: "175px",
    },
  ];
  const filteredData = data.filter(
    (invoice) =>
      (statusFilter === "" || invoice.invoice_status === statusFilter) &&
      (typeFilter === "" || invoice.invoice_type === typeFilter)
  );

  return (
    <div>
      <Table
        data={filteredData}
        columns={columns}
        tableName="Recent Invoice"
        showViewAll={false}
        enablePagination={false}
        rowsPerPage={5}
        icons={icons}
        bg_i1="bg-customBlue-10"
        bg_i2="bg-sucess-20"
        bg_i3="bg-primary-40"
      />
      {/* <div className=" flex justify-between">
        <div className="flex justify-between md:gap-4 gap-3">
          <Button
            text="Start Date - End Date"
            imgSrc={ICONS.calanderGray}
            color="border-neutral-80 border-2 bg-white text-[14px] text-black md:w-[290]"
            iconClassName="h-[16px] w-[16px] order-2"
            textClass="hidden"
          />
          <Button
            text="Filter"
            imgSrc={ICONS.filterGray}
            color="border-neutral-80 border-2 bg-white text-[14px] text-black"
            iconClassName="h-[16px] w-[16px]"
            textClass="hidden"
          />
          <Button
            text="Remove Filter"
            imgSrc={ICONS.removeFilterGray}
            color="border-neutral-80 border-2 bg-white text-[14px] text-black"
            iconClassName="h-[16px] w-[16px]"
            textClass="hidden"
            onClick={removeFilter}
          />
        </div>
        <DownloadButton data={data} />
      </div> */}
    </div>
  );
};

export default InvoiceTable;
