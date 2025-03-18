import React, { useEffect, useState } from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";
import { formatNumber } from "../../utils";
import { InvoiceResponse } from "../../types/invoice";
import { Invoice } from "../../types/client";

const DashboardTable = ({
  invoices,
  editToggleModel,
  handleDelete,
}: {
  invoices: InvoiceResponse[] | undefined;
  editToggleModel: (id?: string) => void;
  handleDelete?: (id?: string) => void;
}) => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const icons = {
    i1: ICONS.blueTick,
    i2: ICONS.editBlack,
    i3: ICONS.deleteRed,
  };

  const [sortedData, setSortedData] = useState(invoices);
  const handleSort = (order: "asc" | "desc"): void => {
    const sorted = [...(sortedData || [])].sort((a, b) => {
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
        let statusClass ="text-gray-700 bg-gray-100 h-[28px] py-[2px] px-[12px] rounded-[12px] font-sans text-[12px] font-normal leading-[20px] text-left";// Gray for DRAFT
      
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
          <span className={statusClass}>
            {row.billingStatus?.toUpperCase() === "DRAFT/PERFORMA INVOICE"
              ? "DRAFT"
              : row.billingStatus?.toUpperCase()}
          </span>
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
      onIcon1Click: () => handleSort("asc"),
      onIcon2Click: () => handleSort("desc"),
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
    // console.log(typeFilter);
  }, [typeFilter]);
  const handleViewAction =(()=>{
    setTypeFilter("");
    setStatusFilter("")
  })
  return (
    <div>
      <Table
        data={filteredData || []}
        columns={columns}
        tableName="Recent Invoice"
        showViewAll={true}
        enablePagination={true}
        rowsPerPage={10}
        icons={icons}
        bg_i1="bg-customBlue-10"
        bg_i2="bg-neutral-65"
        bg_i3="bg-primary-40"
        handleDelete={handleDelete}
        editToggleModel={editToggleModel}
        handleViewAction={handleViewAction}
      />
    </div>
  );
};

export default DashboardTable;
