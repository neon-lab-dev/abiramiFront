import React, { useEffect, useState } from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";
import { formatNumber } from "../../utils";
import { Invoice } from "../../types/client";

// Define a type for the row data
interface Dashboard {
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
  editToggleModel: () => void;
  handleDelete: () => void;
}

const DashboardTable = ({
  invoices,
  editToggleModel,
  handleDelete,
}: {
  invoices: any[];
  editToggleModel: () => void;
  handleDelete: () => void;
}) => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const formatCurrency = (value: number) => {
    return `₹ ${value?.toLocaleString()}`;
  };

  const icons = {
    i1: ICONS.blueTick,
    i2: ICONS.greenCross,
    i3: ICONS.deleteRed,
  };

  // const data: Dashboard[] = [
  //   {
  //     invoice_id: "kjsdgnbj",
  //     invoice_status: "PAID",
  //     client: "ljadbvilhb4jh345kj4n",
  //     invoice_type: "Cheque Invoice",
  //     total_amount: 985735689,
  //     created_date: new Date(2024, 4, 10),
  //     tax: 985735689,
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     invoice_id: "kjsdgnbj",
  //     invoice_status: "PENDING",
  //     client: "ljadbvilhb4jh345kj4n",
  //     invoice_type: "Cheque Invoice",
  //     total_amount: 985735689,
  //     created_date: new Date(2024, 3, 10),
  //     tax: 985735689,
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     invoice_id: "kjsdgnbj",
  //     invoice_status: "PAID",
  //     client: "ljadbvilhb4jh345kj4n",
  //     invoice_type: "Quote Invoice",
  //     total_amount: 985735689,
  //     created_date: new Date(2024, 1, 10),
  //     tax: 985735689,
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     invoice_id: "kjsdgnbj",
  //     invoice_status: "PAID",
  //     client: "ljadbvilhb4jh345kj4n",
  //     invoice_type: "Cheque Invoice",
  //     total_amount: 985735689,
  //     created_date: new Date(2024, 8, 10),
  //     tax: 985735689,
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     invoice_id: "kjsdgnbj",
  //     invoice_status: "PENDING",
  //     client: "ljadbvilhb4jh345kj4n",
  //     invoice_type: "Tax invoice",
  //     total_amount: 985735689,
  //     created_date: new Date(2024, 2, 10),
  //     tax: 985735689,
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     invoice_id: "kjsdgnbj",
  //     invoice_status: "PENDING",
  //     client: "ljadbvilhb4jh345kj4n",
  //     invoice_type: "Tax invoice",
  //     total_amount: 985735689,
  //     created_date: new Date(2024, 6, 10),
  //     tax: 985735689,
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     invoice_id: "kjsdgnbj",
  //     invoice_status: "PENDING",
  //     client: "ljadbvilhb4jh345kj4n",
  //     invoice_type: "Quote Invoice",
  //     total_amount: 985735689,
  //     created_date: new Date(2024, 4, 10),
  //     tax: 985735689,
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     invoice_id: "kjsdgnbj",
  //     invoice_status: "PENDING",
  //     client: "ljadbvilhb4jh345kj4n",
  //     invoice_type: "Tax invoice",
  //     total_amount: 985735689,
  //     created_date: new Date(2024, 3, 10),
  //     tax: 985735689,
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     invoice_id: "kjsdgnbj",
  //     invoice_status: "DRAFT",
  //     client: "ljadbvilhb4jh345kj4n",
  //     invoice_type: "Tax invoice",
  //     total_amount: 985735689,
  //     created_date: new Date(2024, 9, 10),
  //     tax: 985735689,
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     invoice_id: "kjsdgnbj",
  //     invoice_status: "DRAFT",
  //     client: "ljadbvilhb4jh345kj4n",
  //     invoice_type: "Quote Invoice",
  //     total_amount: 985735689,
  //     created_date: new Date(2024, 2, 10),
  //     tax: 985735689,
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },

  //   {
  //     invoice_id: "kjsdgnbj",
  //     invoice_status: "DRAFT",
  //     client: "ljadbvilhb4jh345kj4n",
  //     invoice_type: "Quote Invoice",
  //     total_amount: 985735689,
  //     created_date: new Date(2024, 2, 10),
  //     tax: 985735689,
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     invoice_id: "kjsdgnbj",
  //     invoice_status: "DRAFT",
  //     client: "ljadbvilhb4jh345kj4n",
  //     invoice_type: "Quote Invoice",
  //     total_amount: 985735689,
  //     created_date: new Date(2024, 2, 10),
  //     tax: 985735689,
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  // ];

  const [sortedData, setSortedData] = useState(invoices);
  const handleSort = (data: Dashboard[], order: "asc" | "desc"): void => {
    const sorted = [...sortedData].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (order === "asc") {
        return dateA.getTime() - dateB.getTime(); // Convert dates to timestamps
      } else if (order === "desc") {
        return dateB.getTime() - dateA.getTime(); // Convert dates to timestamps
      }
      return 0;
    });

    setSortedData(sorted);
  };

  const columns = [
    {
      header: "Invoice Id",
      accessor: "id",
      cellClassName: " text-blue-20 ",
      width: "300px",
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
                  setStatusFilter("DRAFT/PERFORMA INVOICE");
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
      accessor: "billingStatus",
      cellRenderer: (row: Invoice) => {
        let statusClass = "";
        console.log(
          row.billingStatus.toUpperCase() === "DRAFT/PERFORMA INVOICE"
        );

        // Conditional coloring based on invoice_status
        if (row.billingStatus.toUpperCase() === "PAID") {
          statusClass =
            "text-neutral-90 bg-neutral-50 h-[28px] py-[2px] px-[12px] rounded-[12px] font-sans text-[12px] font-normal leading-[20px] text-left"; // Green for PAID
        } else if (row.billingStatus.toUpperCase() === "PENDING") {
          statusClass =
            "text-yellow-500 bg-secondary-35 h-[28px]  py-[2px] px-[12px] rounded-[12px] font-sans text-[12px] font-normal leading-[20px] text-left"; // Yellow for PENDING (PENDING)
        } else if (
          row.billingStatus.toUpperCase() === "DRAFT/PERFORMA INVOICE"
        ) {
          statusClass =
            "text-gray-500  font-sans text-[12px] font-normal leading-[20px] text-left"; // Gray for DRAFT
        }

        return (
          <span className={statusClass}>{row.billingStatus.toUpperCase()}</span>
        );
      },
      width: "112px",
    },

    {
      header: "Client",
      accessor: "clientName",
      cellClassName: "text-black",
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
                  setTypeFilter("cash invoice");
                  setDropdownOpen2(false);
                }}
                className={`block w-full text-left p-2 hover:bg-blue-20 py-[7px] px-4 ${
                  typeFilter === "cash invoice"
                    ? "text-white bg-blue-500"
                    : "text-neutral-100"
                }`}
              >
                Cash Invoice
              </button>
              <button
                onClick={() => {
                  setTypeFilter("cheque invoice");
                  setDropdownOpen2(false);
                }}
                className={`block w-full text-left p-2 hover:bg-blue-20 py-[7px] px-4 ${
                  typeFilter === "cheque invoice"
                    ? "text-white bg-blue-500"
                    : "text-neutral-100"
                }`}
              >
                Cheque Invoice
              </button>
              <button
                onClick={() => {
                  setTypeFilter("quote invoice");
                  setDropdownOpen2(false);
                }}
                className={`block w-full text-left p-2 hover:bg-blue-20 py-[7px] px-4 ${
                  typeFilter === "quote invoice"
                    ? "text-white bg-blue-500"
                    : "text-neutral-100"
                }`}
              >
                Quote Invoice
              </button>
              <button
                onClick={() => {
                  setTypeFilter("tax invoice");
                  setDropdownOpen2(false);
                }}
                className={`block w-full text-left p-2 hover:bg-blue-20 py-[7px] px-4 ${
                  typeFilter === "tax invoice"
                    ? "text-white bg-blue-500"
                    : "text-neutral-100"
                }`}
              >
                Tax invoice
              </button>
            </div>
          )}
        </div>
      ),

      accessor: "invoiceType",
      cellClassName: "text-black",
      width: "141px",
    },
    {
      header: "Total Amount",
      accessor: "totalAmount",
      cellRenderer: (row: Invoice) => {
        return (
          <span className="text-black">₹ {formatNumber(row.totalAmount)}</span>
        );
      },
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "141px",
    },
    {
      header: "Tax",
      accessor: "taxGST",
      cellRenderer: (row: Invoice) => {
        // console.log(row.tax);
        return <span className="text-black">₹ {formatNumber(row.taxGST)}</span>;
      },
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "111px",
    },

    {
      header: "Created Date",
      accessor: "createdAt",
      type: "date",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      format: (value: Date) =>
        value.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      // icon1: ICONS.downArrow,
      // onIcon1Click: () => handleSort(data, "asc"),
      icon2: ICONS.downArrow2,
      icon1: ICONS.upArrow,
      width: "143px",
      onIcon1Click: () => handleSort(data, "asc"),
      onIcon2Click: () => handleSort(data, "desc"),
      // width: "141px",
    },
  ];
  const filteredData = sortedData?.filter(
    (invoice) =>
      (statusFilter === "" ||
        invoice.billingStatus.toLowerCase() === statusFilter.toLowerCase()) &&
      (typeFilter === "" ||
        invoice.invoiceType.toLowerCase() === typeFilter.toLowerCase())
  );
  useEffect(() => {
    console.log(typeFilter);
  }, [typeFilter]);

  return (
    <div>
      <Table
        data={filteredData}
        columns={columns}
        tableName="Recent Invoice"
        showViewAll={true}
        enablePagination={true}
        rowsPerPage={10}
        icons={icons}
        bg_i1="bg-customBlue-10"
        bg_i2="bg-sucess-20"
        bg_i3="bg-primary-40"
        handleDelete={handleDelete}
        editToggleModel={editToggleModel}
      />
    </div>
  );
};

export default DashboardTable;
