import React from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";
import DownloadButton from "../Shared/Table/DownloadExcelBtn";
import Button from "../Shared/Button/Button";

interface Purchase {
    company_name: string;
    invoice_number: string;
    gst: string;
    total_bill_value: number;
    purchase_date: Date; // Change to Date type
    status: "Active" | "Inactive";
    i1: boolean;
    i2: boolean;
    i3: boolean;
    iconsOrder: string[];
  }

  const PurchaseTable: React.FC = () => {
    const formatCurrency = (value: number) => {
        return `₹ ${value.toLocaleString()}`;
      };
    const icons = {
      i1: ICONS.editBlack,
      i2: ICONS.deleteRed,
      i3: ICONS.blueTick,
    };

    const data: Purchase[] = [
        {
          company_name: "kjsdgnbj",
          invoice_number: "some text",
          gst: "ljadbvilhb4jh345kj4n",
          total_bill_value: 985735689,
    
          purchase_date: new Date(2024, 2, 10),
          status: "Active",
          i1: true,
          i2: true,
          i3: false, 
          iconsOrder: ["i1", "i2", "i3"]
           },
        {
          company_name: "kjsdgnbj",
          invoice_number: "some text",
          gst: "ljadbvilhb4jh345kj4n",
          total_bill_value: 985735689,
    
          purchase_date: new Date(2024, 2, 10),
          status: "Active",
          i1: true,
          i2: true,
          i3: false,  
          iconsOrder: ["i1", "i2", "i3"]   },
        {
          company_name: "kjsdgnbj",
          invoice_number: "some text",
          gst: "ljadbvilhb4jh345kj4n",
          total_bill_value: 985735689,
    
          purchase_date: new Date(2024, 2, 10),
          status: "Active",
          i1: true,
          i2: true,
          i3: false,  
          iconsOrder: ["i1", "i2", "i3"]   },
        {
          company_name: "kjsdgnbj",
          invoice_number: "some text",
          gst: "ljadbvilhb4jh345kj4n",
          total_bill_value: 985735689,
    
          purchase_date: new Date(2024, 2, 10),
          status: "Active",
          i1: true,
          i2: true,
          i3: false,  
          iconsOrder: ["i1", "i2", "i3"]   },
        {
          company_name: "kjsdgnbj",
          invoice_number: "some text",
          gst: "ljadbvilhb4jh345kj4n",
          total_bill_value: 985735689,
    
          purchase_date: new Date(2024, 2, 10),
          status: "Active",
          i1: true,
          i2: true,
          i3: false,  
          iconsOrder: ["i1", "i2", "i3"]   },
        {
          company_name: "kjsdgnbj",
          invoice_number: "some text",
          gst: "ljadbvilhb4jh345kj4n",
          total_bill_value: 985735689,
    
          purchase_date: new Date(2024, 2, 10),
          status: "Active",
          i1: true,
          i2: true,
          i3: false,  
          iconsOrder: ["i1", "i2", "i3"]   },
        {
          company_name: "kjsdgnbj",
          invoice_number: "some text",
          gst: "ljadbvilhb4jh345kj4n",
          total_bill_value: 985735689,
    
          purchase_date: new Date(2024, 2, 10),
          status: "Active",
          i1: true,
          i2: true,
          i3: false,  
          iconsOrder: ["i1", "i2", "i3"]   },
        {
          company_name: "kjsdgnbj",
          invoice_number: "some text",
          gst: "ljadbvilhb4jh345kj4n",
          total_bill_value: 985735689,
    
          purchase_date: new Date(2024, 2, 10),
          status: "Active",
          i1: true,
          i2: true,
          i3: false,  
          iconsOrder: ["i1", "i2", "i3"]   },
        {
          company_name: "kjsdgnbj",
          invoice_number: "some text",
          gst: "ljadbvilhb4jh345kj4n",
          total_bill_value: 985735689,
    
          purchase_date: new Date(2024, 2, 10),
          status: "Active",
          i1: true,
          i2: true,
          i3: false,  
          iconsOrder: ["i1", "i2", "i3"]   },
        {
          company_name: "kjsdgnbj",
          invoice_number: "some text",
          gst: "ljadbvilhb4jh345kj4n",
          total_bill_value: 985735689,
    
          purchase_date: new Date(2024, 2, 10),
          status: "Active",
          i1: true,
          i2: true,
          i3: false,  
          iconsOrder: ["i1", "i2", "i3"]   },
    
        {
          company_name: "kjsdgnbj",
          invoice_number: "some text",
          gst: "ljadbvilhb4jh345kj4n",
          total_bill_value: 985735689,
    
          purchase_date: new Date(2024, 2, 10),
          status: "Active",
          i1: true,
          i2: true,
          i3: false,  
          iconsOrder: ["i1", "i2", "i3"]   },
        {
          company_name: "kjsdgnbj",
          invoice_number: "some text",
          gst: "ljadbvilhb4jh345kj4n",
          total_bill_value: 985735689,
    
          purchase_date: new Date(2024, 2, 10),
          status: "Active",
          i1: true,
          i2: true,
          i3: false,  
          iconsOrder: ["i1", "i2", "i3"]   },
      ];

      const columns = [
        {
          header: "Company",
          accessor: "company_name",
          cellClassName: " text-neutral-25 ",
          icon1: ICONS.search,
        },
        {
          header: "Invoice Number",
          accessor: "invoice_number",
          cellClassName: "text-black",
        },
        {
          header: "GST",
          accessor: "gst",
          cellClassName: "text-black",
          icon1: ICONS.search,
        },
        {
          header: "Total Bill Value (₹)",
          accessor: "total_bill_value",
          cellRenderer: (row: Purchase) => {
            console.log(row.total_bill_value); // For debugging
            return <span className="text-black">{formatCurrency(row.total_bill_value)}</span>;
          },
          cellClassName: "text-black",
        },
        {
          header: "Purchase Date",
          accessor: "purchase_date",
          cellClassName: "text-black",
          format: (value: Date) =>
            value.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
        },
        {
          header: "Status",
          accessor: "status",
        },
      ];
    
    
  return (
    <div>
    <Table
      data={data}
      columns={columns}
      tableName="Recent Purchase"
      showViewAll={false}
      enablePagination={false}
      rowsPerPage={5}
      icons={icons}
      bg_i1="bg-neutral-65"
      bg_i2="bg-primary-40"
      bg_i3="bg-blue-10"
      
    />
    <div className=" flex justify-between">
      <div className="flex justify-between md:gap-4 gap-3">
      <Button
        text="Remove Filter"
        imgSrc={ICONS.clientOutline}   
        color='border-neutral-80 border-2 bg-white text-[14px] text-primary-10'
        iconClassName="h-[16px] w-[16px]"
        textClass="hidden"
      />
      <Button
        text="Filter"
        imgSrc={ICONS.filter}   
        color='border-neutral-80 border-2 bg-white text-[14px] text-primary-10'
        iconClassName="h-[16px] w-[16px]"
        textClass="hidden"
      />
      <Button
        text="Remove Filter"
        imgSrc={ICONS.removeFilter}   
        color='border-neutral-80 border-2 bg-white text-[14px] text-primary-10'
        iconClassName="h-[16px] w-[16px]"
        textClass="hidden"
      />
      </div>
    <DownloadButton data={data}/>
    </div>
    
  </div>

  )
}

export default PurchaseTable