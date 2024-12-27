import React from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";

// Define a type for the row data
interface Supplier {
  companyname: string;
  title_item: string;
  gst: string;
  mobile_no: string;
  address: string;
  created_date: Date;  // Change to Date type
  status: "Active" | "Inactive";
  canEdit: boolean;
  canApprove: boolean;
  canDelete: boolean;
  iconsOrder: string[];
}

const SuppliersTable: React.FC = () => {
  const icons = {
    i1: ICONS.editBlack,
    i2: ICONS.blueTick,
    i3: ICONS.deleteRed,
  };

  const data: Supplier[] = [
    {
      companyname: "kjsdgnbj",
      title_item: "some text",
      gst: "ljadbvilhb4jh345kj4n",
      mobile_no: "985735689",
      address:"some stereet",
      created_date:new Date(2024, 2, 10),
      status: "Active",
      canEdit: true,
      canApprove: true,
      canDelete: true,
      iconsOrder: ["edit", "approve", "delete"]
    },
    {
        companyname: "kjsdgnbj",
        title_item: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        canEdit: true,
        canApprove: true,
        canDelete: true,
        iconsOrder: ["edit", "approve", "delete"]
      },
      {
        companyname: "kjsdgnbj",
        title_item: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        canEdit: true,
        canApprove: true,
        canDelete: true,
        iconsOrder: ["edit", "approve", "delete"]
      },
      {
        companyname: "kjsdgnbj",
        title_item: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        canEdit: true,
        canApprove: true,
        canDelete: true,
        iconsOrder: ["edit", "approve", "delete"]
      },
      {
        companyname: "kjsdgnbj",
        title_item: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        canEdit: true,
        canApprove: true,
        canDelete: true,
        iconsOrder: ["edit", "approve", "delete"]
      },{
        companyname: "kjsdgnbj",
        title_item: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        canEdit: true,
        canApprove: true,
        canDelete: true,
        iconsOrder: ["edit", "approve", "delete"]
      },
      {
        companyname: "kjsdgnbj",
        title_item: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        canEdit: true,
        canApprove: true,
        canDelete: true,
        iconsOrder: ["edit", "approve", "delete"]
      },
      {
        companyname: "kjsdgnbj",
        title_item: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        canEdit: true,
        canApprove: true,
        canDelete: true,
        iconsOrder: ["edit", "approve", "delete"]
      },
      {
        companyname: "kjsdgnbj",
        title_item: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        canEdit: true,
        canApprove: true,
        canDelete: true,
        iconsOrder: ["edit", "approve", "delete"]
      },{
        companyname: "kjsdgnbj",
        title_item: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        canEdit: true,
        canApprove: true,
        canDelete: true,
        iconsOrder: ["edit", "approve", "delete"]
      },

    {
        companyname: "kjsdgnbj",
        title_item: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        canEdit: true,
        canApprove: true,
        canDelete: true,
        iconsOrder: ["edit", "approve", "delete"]
      },
      {
        companyname: "kjsdgnbj",
        title_item: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        canEdit: true,
        canApprove: true,
        canDelete: true,
        iconsOrder: ["edit", "approve", "delete"]
      },
  ];

  const columns = [
    {
      header: "Company Name",
      accessor: "companyname",
      cellClassName: "text-black",
    },
    {
      header: "Title/Item",
      accessor: "title_item",
      cellClassName: "text-black",
    },
    {
      header: "GST",
      accessor: "gst",
      cellClassName: "text-black",
      icon1: ICONS.search,
    },
    {
      header: "Mobile No.",
      accessor: "mobile_no",
      cellClassName: "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      icon1: ICONS.search,
    },
    {
        header: "Address",
        accessor: "address",
        cellClassName: "text-black",
      },
    {
      header: "Created Date",
      accessor: "created_date",
      cellClassName: "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      format: (value: Date) => value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

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
        tableName="Recent Invoice"
        showViewAll={false}
        enablePagination={true}
        rowsPerPage={5}
        icons={icons}
        bg_i1 = "bg-secondary-65"
        bg_i2 = "bg-customBlue-10"
        bg_i3 = "bg-primary-40"
       
      />
    </div>
  );
};

export default SuppliersTable;
