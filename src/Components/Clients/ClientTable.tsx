import React,{useState} from "react";
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
      company_name: "Apollo Electrical Text 2",
      contact_person: "some text",
      gst: "GAAAJDU09847",
      mobile_no: "+91 78654 76534",
      address:"Apollo Electrical Text 2",
      created_date:new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"]
    },
    {
        company_name: "Apollo Electrical ",
         contact_person: "some text",
        gst: "GAAAJDU09847",
        mobile_no: "+91 78654 76534",
        address:"Chennai Wires and Spares",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "Apollo Electrical ",
         contact_person: "some text",
        gst: "GAAAJDU09847",
        mobile_no: "+91 78654 76534",
        address:"Chennai Wires and Spares",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "Apollo Electrical ",
         contact_person: "some text",
        gst: "GAAAJDU09847",
        mobile_no: "+91 78654 76534",
        address:"Chennai Wires and Spares",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "Apollo Electrical ",
         contact_person: "some text",
        gst: "GAAAJDU09847",
        mobile_no: "+91 78654 76534",
        address:"Chennai Wires and Spares",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },{
        company_name: "Apollo Electrical ",
         contact_person: "some text",
        gst: "GAAAJDU09847",
        mobile_no: "+91 78654 76534",
        address:"Chennai Wires and Spares",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "Apollo Electrical ",
         contact_person: "some text",
        gst: "GAAAJDU09847",
        mobile_no: "+91 78654 76534",
        address:"Chennai Wires and Spares",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "Apollo Electrical ",
         contact_person: "some text",
        gst: "GAAAJDU09847",
        mobile_no: "+91 78654 76534",
        address:"Chennai Wires and Spares",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "Apollo Electrical ",
        contact_person: "some text",
        gst: "GAAAJDU09847",
        mobile_no: "+91 78654 76534",
        address:"Chennai Wires and Spares",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },{
        company_name: "Apollo Electrical ",
         contact_person: "some text",
        gst: "GAAAJDU09847",
        mobile_no: "+91 78654 76534",
        address:"Chennai Wires and Spares",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },

    {
        company_name: "Apollo Electrical ",
         contact_person: "some text",
        gst: "GAAAJDU09847",
        mobile_no: "+91 78654 76534",
        address:"Chennai Wires and Spares",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
      {
        company_name: "Apollo Electrical ",
         contact_person: "some text",
        gst: "GAAAJDU09847",
        mobile_no: "+91 78654 76534",
        address:"Chennai Wires and Spares",
        created_date:new Date(2024, 2, 10),        status: "Active",
        i1: true,
        i2: true,
        i3: true,
        iconsOrder: ["i1", "i2", "i3"]
      },
  ];
  const [sortedData, setSortedData] = useState(data); // Initial data array

  const handleSort = (data: Client[], order: "asc" | "desc"): void  => {
    const sorted = [...sortedData].sort((a, b) => {
      const dateA = new Date(a.created_date);
      const dateB = new Date(b.created_date);
      
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
      header: "Company Name",
      accessor: "company_name",
      cellClassName: " text-neutral-25 ",
      width:"196px"
    },
    {
      header: "Contact Person",
      accessor: "contact_person",
      cellClassName: "text-black",
      width:"160px"
    },
    {
      header: "GST",
      accessor: "gst",
      cellClassName: "text-black",
      icon1: ICONS.search,
      width:"148px"
    },
    {
      header: "Mobile No.",
      accessor: "mobile_no",
      cellClassName: "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      icon1: ICONS.search,
      width:"148px"
    },
    {
        header: "Address",
        accessor: "address",
        cellClassName: "text-black",
        width:"216px"
      },
    {
      header: "Created Date",
      accessor: "created_date",
      cellClassName: "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      format: (value: Date) => value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      icon2:ICONS.downArrow2,
      icon1:ICONS.upArrow,
      width: "143px",
      onIcon1Click: () => handleSort( data,"asc"),
      onIcon2Click: () => handleSort( data,"desc")},
    {
      header: "Status",
      accessor: "status",
      width:"112px"
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
        bg_i1 = "bg-customBlue-10"
        bg_i2 = "bg-secondary-175"
        bg_i3 = "bg-primary-40"
       
      />
    </div>
  );
};

export default ClientTable;
