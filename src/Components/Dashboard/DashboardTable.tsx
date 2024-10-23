import React from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";

// Define a type for the row data
interface Dashboard {
  invoice_id: string;
  invoice_status: "Paid"|"Painding"|"Draft";
  client: string;
  invoice_type: "Cheque Invoice"|"Quote Invoice"|"Tax invoice";
  total_amount: number;
  tax:number;
  created_date: Date; 
  i1: boolean;
  i2: boolean;
  i3: boolean;
  iconsOrder: string[];
}

const DashboardTable: React.FC = () => {
    const formatCurrency = (value: number) => {
        return `₹ ${value.toLocaleString()}`;
      };

  const icons = {
    i1: ICONS.blueTick,
    i2: ICONS.greenCross,
    i3: ICONS.deleteRed,
  };

  const data: Dashboard[] = [
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "Paid",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type:"Cheque Invoice"  ,
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax:985735689,
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "Painding",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type:"Cheque Invoice"  ,
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
      invoice_status: "Paid",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type:"Quote Invoice"  ,
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
      invoice_status: "Paid",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type:"Cheque Invoice"  ,
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax:985735689,
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status: "Painding",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type:"Tax invoice"  ,
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
      invoice_status:"Painding",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type:"Tax invoice"  ,
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
      invoice_status:"Painding",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type:"Quote Invoice"  ,
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax:985735689,
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status:"Painding",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type:"Tax invoice"  ,
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax:985735689,
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status:"Draft",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type:"Tax invoice"  ,
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax:985735689,
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status:"Draft",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type:"Quote Invoice"  ,
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax:985735689,
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },

    {
      invoice_id: "kjsdgnbj",
      invoice_status:"Draft",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type:"Quote Invoice"  ,
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax:985735689,
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      invoice_id: "kjsdgnbj",
      invoice_status:"Draft",
      client: "ljadbvilhb4jh345kj4n",
      invoice_type:"Quote Invoice"  ,
      total_amount: 985735689,
      created_date: new Date(2024, 2, 10),
      tax:985735689,
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
  ];

  const columns = [
    {
      header: "Invoice Id",
      accessor: "invoice_id",
      cellClassName: " text-neutral-25 ",
      width:"130px",
    },
    {
      header: "Status",
      accessor: "invoice_status",
      cellRenderer: (row: Dashboard) => {
        let statusClass = "";
  
        // Conditional coloring based on invoice_status
        if (row.invoice_status === "Paid") {
          statusClass = "text-green-500";  // Green for Paid
        } else if (row.invoice_status === "Painding") {
          statusClass = "text-yellow-500"; // Yellow for Painding (Pending)
        } else if (row.invoice_status === "Draft") {
          statusClass = "text-gray-500";   // Gray for Draft
        }
  
        return <span className={statusClass}>{row.invoice_status}</span>;
      },
      icon1:ICONS.downArrow,
      width:"112px",
    },
    {
      header: "Client",
      accessor: "client",
      cellClassName: "text-black",
    },
    {
      header: "Invoice Type",
      accessor: "invoice_type",
      cellClassName: "text-black",
      icon1:ICONS.downArrow
    },
    {
      header: "Total Amount",
      accessor: "total_amount",
      cellRenderer: (row: Dashboard) => {
        console.log(row.total_amount); // For debugging
        return <span className="text-black">{formatCurrency(row.total_amount)}</span>;
      },
      cellClassName: "text-black",
    },
    {
      header: "Tax",
      accessor: "tax",
      cellRenderer: (row: Dashboard) => {
        console.log(row.tax); // For debugging
        return <span className="text-black">{formatCurrency(row.tax)}</span>;
      },
      cellClassName: "text-black",
    },

    {
      header: "Created Date",
      accessor: "created_date",
      cellClassName: "text-black",
      format: (value: Date) =>
        value.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
  ];

  return (
    <div>
      <Table
        data={data}
        columns={columns}
        tableName="Recent Invoice"
        showViewAll={true}
        enablePagination={false}
        rowsPerPage={5}
        icons={icons}
        bg_i1="bg-blue-10"
        bg_i2="bg-sucess-20"
        bg_i3="bg-primary-40"
      />
    </div>
  );
};

export default DashboardTable;
