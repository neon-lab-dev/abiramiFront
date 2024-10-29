import React, { useState } from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";
import DownloadButton from "../Shared/Table/DownloadExcelBtn";
import Button from "../Shared/Button/Button";

// Define a type for the row data
interface Inventory {
  refrences: string;
  category: string;
  discription: string;
  quantity:number;
  quantityType: string;
  alarm:number,
  buying_cost: number;
  selling_cost: number;
  location:string;
  updated_date: Date;
  i1: boolean;
  i2: boolean;
  i3: boolean;
  iconsOrder: string[];
}

const InventoryListPageTable: React.FC = () => {
 

  const formatCurrency = (value: number) => {
    return `₹ ${value.toLocaleString()}`;
  };
  

  const icons = {
    i1: ICONS.blueTick,
    i2: ICONS.editBlack,
    i3: ICONS.deleteRed,
  };

  const data: Inventory[] = [
    {
      refrences: "kjsdgnbj",
      category: "PAID",
      discription: "ljadbvilhb4jh345kj4n",
      quantity: 2,
      quantityType:"pieces",
      alarm:6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 1, 10),
      selling_cost: 985735689,
      location:"n djkfvbvjkdsfv",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PENDING",
      discription: "ljadbvilhb4jh345kj4n",
      quantity: 67,
      quantityType:"pieces",
      alarm:6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 12),
      selling_cost: 985735689,
      location:"n djkfvbvjkdsfv",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PAID",
      discription: "ljadbvilhb4jh345kj4n",
      quantity: 787,
      quantityType:"pieces",
      alarm:6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 18),
      selling_cost: 985735689,
      location:"n djkfvbvjkdsfv",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PAID",
      discription: "ljadbvilhb4jh345kj4n",
      quantity: 67,
      quantityType:"pieces",
      alarm:6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 3, 10),
      selling_cost: 985735689,
      location:"n djkfvbvjkdsfv",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PENDING",
      discription: "ljadbvilhb4jh345kj4n",
      quantity: 87,
      quantityType:"pieces",
      alarm:6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 1, 10),
      selling_cost: 985735689,
      location:"n djkfvbvjkdsfv",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PENDING",
      discription: "ljadbvilhb4jh345kj4n",
      quantity: 87,
      quantityType:"pieces",
      alarm:6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 12, 10),
      selling_cost: 985735689,
      location:"n djkfvbvjkdsfv",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PENDING",
      discription: "ljadbvilhb4jh345kj4n",
      quantity: 787,
      quantityType:"pieces",
      alarm:6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 11, 10),
      selling_cost: 985735689,
      location:"n djkfvbvjkdsfv",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PENDING",
      discription: "ljadbvilhb4jh345kj4n",
      quantity: 87,
      quantityType:"pieces",
      alarm:6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 15),
      selling_cost: 985735689,
      location:"n djkfvbvjkdsfv",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "DRAFT",
      discription: "ljadbvilhb4jh345kj4n",
      quantity: 87,
      quantityType:"pieces",
      alarm:6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 16),
      selling_cost: 985735689,
      location:"n djkfvbvjkdsfv",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "DRAFT",
      discription: "ljadbvilhb4jh345kj4n",
      quantity: 787,
      quantityType:"pieces",
      alarm:6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 4),
      selling_cost: 985735689,
      location:"n djkfvbvjkdsfv",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },

    {
      refrences: "kjsdgnbj",
      category: "DRAFT",
      discription: "ljadbvilhb4jh345kj4n",
      quantity: 787,
      quantityType:"pieces",
      alarm:6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 10),
      selling_cost: 985735689,
      location:"n djkfvbvjkdsfv",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "DRAFT",
      discription: "ljadbvilhb4jh345kj4n",
      quantity: 787,
      quantityType:"pieces",
      alarm:6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 10),
      selling_cost: 985735689,
      location:"n djkfvbvjkdsfv",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
  ];
  const [sortedData, setSortedData] = useState(data); // Initial data array

const handleSort = (data: Inventory[], order: "asc" | "desc"): void  => {
  const sorted = [...sortedData].sort((a, b) => {
    const dateA = new Date(a.updated_date);
    const dateB = new Date(b.updated_date);
    
    if (order === "asc") {
      return dateA.getTime() - dateB.getTime(); // Convert dates to timestamps
    } else if (order === "desc") {
      return dateB.getTime() - dateA.getTime(); // Convert dates to timestamps
    }
    return 0;
  });
 
  
  
  setSortedData(sorted);
};
const handleQuantitySort = (data: Inventory[], order: "asc" | "desc"): void => {
  const sorted = [...sortedData].sort((a, b) => {
    if (order === "asc") {
      return a.quantity - b.quantity;
    } else if (order === "desc") {
      return b.quantity - a.quantity;
    }
    return 0;
  });

  setSortedData(sorted);
};


  const columns = [
    {
      header: "Refrences",
      accessor: "refrences",
      cellClassName: " text-black ",
      width: "106px",
    },
    {
      header: "Category",
      accessor: "category",
      icon1:ICONS.search,
      width: "142px",
    },


    {
      header: "Discription",
      accessor: "discription",
      cellClassName: "text-customBlue-20",
      icon1: ICONS.search,
      width: "160px",
    },

    {
      header: "Quantity",
      accessor: "quantity",
      cellClassName: "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      icon2: ICONS.downArrow2,
      icon1: ICONS.upArrow,
      width: "90px",
      onIcon1Click: () => handleQuantitySort(data, "asc"),
      onIcon2Click: () => handleQuantitySort(data, "desc"),
    },
    
    {
      header: "Quantity Type",
      accessor: "quantityType",
      cellClassName: "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width:"102px"
    },
    {
      header: "Alarm",
      accessor: "alarm",
      cellClassName: "text-black text-center",
      width:"55px"
    },

    {
      header: "Buying Cost",
      accessor: "buying_cost",
      cellRenderer: (row: Inventory) => {
        console.log(row.buying_cost); // For debugging
        return (
          <span className="text-black">{formatCurrency(row.buying_cost)}</span>
        );
      },
      cellClassName: "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "112px",
    },
    {
      header: "Selling Cost",
      accessor: "selling_cost",
      cellRenderer: (row: Inventory) => {
        console.log(row.selling_cost); // For debugging
        return <span className="text-black">{formatCurrency(row.selling_cost)}</span>;
      },
      cellClassName: "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "111px",
    },
    {
      header: "Location",
      accessor: "location",
      cellClassName: "text-black",
      icon1:ICONS.search,
      width: "115px",
    },

    {
      header: "Updated Date",
      accessor: "updated_date",
      cellClassName: "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      format: (value: Date) =>
        value.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      icon1: ICONS.upArrow,
      icon2: ICONS.downArrow2,
      width: "120px",
      onIcon1Click: () => handleSort( data,"asc"),
      onIcon2Click: () => handleSort( data,"desc")},
    
    
  ];

  return (
    <div>
      <Table
        data={sortedData}
        columns={columns}
        tableName="Recent Invoice"
        showViewAll={false}
        enablePagination={false}
        rowsPerPage={5}
        icons={icons}
        bg_i1="bg-customBlue-10"
        bg_i2="bg-neutral-65"
        bg_i3="bg-primary-40"
      />
      <div className=" flex justify-between">
        <div className="flex justify-between md:gap-4 gap-3">
          <Button
            text="Filter"
            imgSrc={ICONS.filterGray}
            color="border-neutral-80 border-2 bg-white text-[14px] text-black"
            iconClassName="h-[16px] w-[16px]"
            textClass="hidden"
          />
        </div>
        <DownloadButton data={data} />
      </div>
    </div>
  );
};

export default InventoryListPageTable;
