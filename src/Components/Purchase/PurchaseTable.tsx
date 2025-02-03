import React, { useEffect, useState } from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";
import DownloadButton from "../Shared/Table/DownloadExcelBtn";
import Button from "../Shared/Button/Button";
import { Purchase } from "../../types/purchase";

const PurchaseTable = ({
  purchases,
  editToggleModel,
  handleDelete,
}: {
  purchases: Purchase[];
  editToggleModel;
  handleDelete;
}) => {
  const formatCurrency = (value: number) => {
    return `₹ ${value?.toLocaleString()}`;
  };

  const icons = {
    i1: ICONS.blueTick,
    i2: ICONS.editBlack,
    i3: ICONS.deleteRed,
  };

  // const data: Purchase[] = [
  //   {
  //     companyName: "kjsdgnbj",
  //     invoice_number: "some text",
  //     gst: "ljadbvilhb4jh345kj4n",
  //     total_bill_value: 985735689,

  //     purchase_date: new Date(2024, 2, 10),
  //     status: "Active",
  //     i1: true,
  //     i2: true,
  //     i3: false,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     companyName: "kjsdgnbj",
  //     invoice_number: "some text",
  //     gst: "ljadbvilhb4jh345kj4n",
  //     total_bill_value: 985735689,

  //     purchase_date: new Date(2024, 2, 10),
  //     status: "Active",
  //     i1: true,
  //     i2: true,
  //     i3: false,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     companyName: "kjsdgnbj",
  //     invoice_number: "some text",
  //     gst: "ljadbvilhb4jh345kj4n",
  //     total_bill_value: 985735689,

  //     purchase_date: new Date(2024, 2, 10),
  //     status: "Active",
  //     i1: true,
  //     i2: true,
  //     i3: false,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     companyName: "kjsdgnbj",
  //     invoice_number: "some text",
  //     gst: "ljadbvilhb4jh345kj4n",
  //     total_bill_value: 985735689,

  //     purchase_date: new Date(2024, 2, 10),
  //     status: "Active",
  //     i1: true,
  //     i2: true,
  //     i3: false,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     companyName: "kjsdgnbj",
  //     invoice_number: "some text",
  //     gst: "ljadbvilhb4jh345kj4n",
  //     total_bill_value: 985735689,

  //     purchase_date: new Date(2024, 2, 10),
  //     status: "Active",
  //     i1: true,
  //     i2: true,
  //     i3: false,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     companyName: "kjsdgnbj",
  //     invoice_number: "some text",
  //     gst: "ljadbvilhb4jh345kj4n",
  //     total_bill_value: 985735689,

  //     purchase_date: new Date(2024, 2, 10),
  //     status: "Active",
  //     i1: true,
  //     i2: true,
  //     i3: false,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     companyName: "kjsdgnbj",
  //     invoice_number: "some text",
  //     gst: "ljadbvilhb4jh345kj4n",
  //     total_bill_value: 985735689,

  //     purchase_date: new Date(2024, 2, 10),
  //     status: "Active",
  //     i1: true,
  //     i2: true,
  //     i3: false,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     companyName: "kjsdgnbj",
  //     invoice_number: "some text",
  //     gst: "ljadbvilhb4jh345kj4n",
  //     total_bill_value: 985735689,

  //     purchase_date: new Date(2024, 2, 10),
  //     status: "Active",
  //     i1: true,
  //     i2: true,
  //     i3: false,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     companyName: "kjsdgnbj",
  //     invoice_number: "some text",
  //     gst: "ljadbvilhb4jh345kj4n",
  //     total_bill_value: 985735689,

  //     purchase_date: new Date(2024, 2, 10),
  //     status: "Active",
  //     i1: true,
  //     i2: true,
  //     i3: false,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     companyName: "kjsdgnbj",
  //     invoice_number: "some text",
  //     gst: "ljadbvilhb4jh345kj4n",
  //     total_bill_value: 985735689,

  //     purchase_date: new Date(2024, 2, 10),
  //     status: "Active",
  //     i1: true,
  //     i2: true,
  //     i3: false,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },

  //   {
  //     companyName: "kjsdgnbj",
  //     invoice_number: "some text",
  //     gst: "ljadbvilhb4jh345kj4n",
  //     total_bill_value: 985735689,

  //     purchase_date: new Date(2024, 2, 10),
  //     status: "Active",
  //     i1: true,
  //     i2: true,
  //     i3: false,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     companyName: "kjsdgnbj",
  //     invoice_number: "some text",
  //     gst: "ljadbvilhb4jh345kj4n",
  //     total_bill_value: 985735689,

  //     purchase_date: new Date(2024, 2, 10),
  //     status: "Active",
  //     i1: true,
  //     i2: true,
  //     i3: false,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  // ];
  const [sortedData, setSortedData] = useState(purchases); // Initial data array

  const handleSort = (data: Purchase[], order: "asc" | "desc"): void => {
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
      header: "Company",
      accessor: "companyName",
      cellClassName: " text-neutral-25 ",
      icon1: ICONS.search,
      width: "270px",
    },
    {
      header: "Invoice Number",
      accessor: "invoiceNumber",
      cellClassName: "text-black",
      width: "200px",
    },
    {
      header: "GST",
      accessor: "gstNum",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      // icon1: ICONS.search,
      width: "164px",
    },
    {
      header: "Total Bill Value (₹)",
      accessor: "totalPurchaseAmt",
      cellRenderer: (row: Purchase) => {
        return (
          <span className="text-black">
            {formatCurrency(row.totalPurchaseAmt)}
          </span>
        );
      },
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "200px",
    },
    {
      header: "Purchase Date",
      accessor: "date",
      type: "date",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      format: (value: Date) =>
        value.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      icon1: ICONS.upArrow,
      icon2: ICONS.downArrow2,
      width: "250px",
      onIcon1Click: () => handleSort(purchases, "asc"),
      onIcon2Click: () => handleSort(purchases, "desc"),
    },
    {
      header: "Status",
      accessor: "status",
      width: "130px",
    },
  ];

  useEffect(() => {
    setSortedData(purchases);
  }, [purchases]);

  return (
    <div>
      <Table
        data={sortedData}
        columns={columns}
        tableName="Recent Purchase"
        showViewAll={false}
        enablePagination={false}
        rowsPerPage={5}
        icons={icons}
        bg_i1="bg-customBlue-10"
        bg_i2="bg-neutral-65"
        bg_i3="bg-primary-40"
        editToggleModel={editToggleModel}
        handleDelete={handleDelete}
      />
      <div className=" flex justify-between">
        <div className="flex justify-between md:gap-4 gap-3">
          {/* <Button
        text="Start Date - End Date"
        imgSrc={ICONS.calander}   
        color='border-neutral-80 border-2 bg-white text-[14px] text-primary-10 md:w-[290px]'
        iconClassName="h-[16px] w-[16px] order-2"
        textClass="hidden order-1"
      /> */}
          <Button
            text="Start Date - End Date"
            imgSrc={ICONS.calander}
            color="border-neutral-80 border-2 bg-white text-[14px] text-primary-10 md:w-[290]"
            iconClassName="h-[16px] w-[16px] order-2"
            textClass="hidden"
          />
          <Button
            text="Filter"
            imgSrc={ICONS.filter}
            color="border-neutral-80 border-2 bg-white text-[14px] text-primary-10"
            iconClassName="h-[16px] w-[16px]"
            textClass="hidden"
          />
          <Button
            text="Remove Filter"
            imgSrc={ICONS.removeFilter}
            color="border-neutral-80 border-2 bg-white text-[14px] text-primary-10"
            iconClassName="h-[16px] w-[16px]"
            textClass="hidden"
          />
        </div>
        <DownloadButton data={purchases} />
      </div>
    </div>
  );
};

export default PurchaseTable;
