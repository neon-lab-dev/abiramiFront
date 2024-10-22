import React from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";

// Define a type for the row data
interface Client {
  company_name: string;
  contact_person: string;
  gst: string;
  mobile_no: string;
  address: string;
  created_date: Date;  // Change to Date type
  status: "Active" | "Inactive";
  i1: boolean;
  i2: boolean;
  i3: boolean;
  iconsOrder: string[];
}

const ClientTable: React.FC = () => {
  const icons = {
    i1: ICONS.blueTick,
    i2: ICONS.editBlack,
    i3: ICONS.deleteRed,
  };

  const data: Client[] = [
    {
      company_name: "kjsdgnbj",
       contact_person: "some text",
      gst: "ljadbvilhb4jh345kj4n",
      mobile_no: "985735689",
      address:"some stereet",
      created_date:new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"]
    },
    {
        company_name: "kjsdgnbj",
         contact_person: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "kjsdgnbj",
         contact_person: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "kjsdgnbj",
         contact_person: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "kjsdgnbj",
         contact_person: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },{
        company_name: "kjsdgnbj",
         contact_person: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "kjsdgnbj",
         contact_person: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "kjsdgnbj",
         contact_person: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "kjsdgnbj",
        contact_person: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },{
        company_name: "kjsdgnbj",
         contact_person: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },

    {
        company_name: "kjsdgnbj",
         contact_person: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "kjsdgnbj",
         contact_person: "some text",
        gst: "ljadbvilhb4jh345kj4n",
        mobile_no: "985735689",
        address:"some stereet",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
  ];

  const columns = [
    {
      header: "Company Name",
      accessor: "company_name",
      cellClassName: " text-neutral-25 ",
    },
    {
      header: "Contact Person",
      accessor: "contact_person",
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
      cellClassName: "text-black",
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
      cellClassName: "text-black",
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
        bg_i1 = "bg-blue-10"
        bg_i2 = "bg-secondary-65"
        bg_i3 = "bg-primary-40"
       
      />
    </div>
  );
};

export default ClientTable;
