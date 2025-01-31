import React, { useEffect, useState } from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";

// Define a type for the row data
interface Client {
  company_name: string;
  contact_person: string;
  gst: string;
  mobile_no: string;
  address: string;
  created_date: Date; // Change to Date type
  status: "Active" | "Inactive";
  i1: boolean;
  i2: boolean;
  i3: boolean;
  iconsOrder: string[];
}

const ClientTable = ({
  clients,
  editToggleModel,
  handleDelete,
}: {
  clients: [];
  editToggleModel: any;
}) => {
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
      address: "Apollo Electrical Text 2",
      created_date: new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      company_name: "Apollo Electrical ",
      contact_person: "some text",
      gst: "GAAAJDU09847",
      mobile_no: "+91 78654 76534",
      address: "Chennai Wires and Spares",
      created_date: new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      company_name: "Apollo Electrical ",
      contact_person: "some text",
      gst: "GAAAJDU09847",
      mobile_no: "+91 78654 76534",
      address: "Chennai Wires and Spares",
      created_date: new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      company_name: "Apollo Electrical ",
      contact_person: "some text",
      gst: "GAAAJDU09847",
      mobile_no: "+91 78654 76534",
      address: "Chennai Wires and Spares",
      created_date: new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      company_name: "Apollo Electrical ",
      contact_person: "some text",
      gst: "GAAAJDU09847",
      mobile_no: "+91 78654 76534",
      address: "Chennai Wires and Spares",
      created_date: new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      company_name: "Apollo Electrical ",
      contact_person: "some text",
      gst: "GAAAJDU09847",
      mobile_no: "+91 78654 76534",
      address: "Chennai Wires and Spares",
      created_date: new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      company_name: "Apollo Electrical ",
      contact_person: "some text",
      gst: "GAAAJDU09847",
      mobile_no: "+91 78654 76534",
      address: "Chennai Wires and Spares",
      created_date: new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      company_name: "Apollo Electrical ",
      contact_person: "some text",
      gst: "GAAAJDU09847",
      mobile_no: "+91 78654 76534",
      address: "Chennai Wires and Spares",
      created_date: new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      company_name: "Apollo Electrical ",
      contact_person: "some text",
      gst: "GAAAJDU09847",
      mobile_no: "+91 78654 76534",
      address: "Chennai Wires and Spares",
      created_date: new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      company_name: "Apollo Electrical ",
      contact_person: "some text",
      gst: "GAAAJDU09847",
      mobile_no: "+91 78654 76534",
      address: "Chennai Wires and Spares",
      created_date: new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },

    {
      company_name: "Apollo Electrical ",
      contact_person: "some text",
      gst: "GAAAJDU09847",
      mobile_no: "+91 78654 76534",
      address: "Chennai Wires and Spares",
      created_date: new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      company_name: "Apollo Electrical ",
      contact_person: "some text",
      gst: "GAAAJDU09847",
      mobile_no: "+91 78654 76534",
      address: "Chennai Wires and Spares",
      created_date: new Date(2024, 2, 10),
      status: "Active",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
  ];

  const [sortedData, setSortedData] = useState(clients.data); // Initial data array

  const handleSort = (data: Client[], order: "asc" | "desc"): void => {
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

  useEffect(() => {
    setSortedData(clients.data);
  }, [clients]);

  console.log(sortedData);

  const columns = [
    {
      header: "Company Name",
      accessor: "companyName",
      cellClassName: "text-neutral-25 ",
      width: "220px",
    },
    {
      header: "Contact Person",
      accessor: "contactPerson",
      cellClassName: "text-black",
      width: "180px",
    },
    {
      header: "GST",
      accessor: "GST",
      cellClassName: "text-black",
      icon1: ICONS.search,
      width: "160px",
    },
    {
      header: "Mobile No.",
      accessor: "mobileNum",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      icon1: ICONS.search,
      width: "160px",
    },
    {
      header: "Address",
      accessor: "addressLine1",
      cellClassName: "text-black",
      width: "220px",
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
      icon2: ICONS.downArrow2,
      icon1: ICONS.upArrow,
      width: "160px",
      onIcon1Click: () => handleSort(data, "asc"),
      onIcon2Click: () => handleSort(data, "desc"),
    },
    {
      header: "Status",
      accessor: "status",
      width: "130px",
    },
  ];

  return (
    <div>
      <Table
        data={sortedData}
        columns={columns}
        tableName="Recent Invoice"
        showViewAll={false}
        enablePagination={true}
        rowsPerPage={10}
        icons={icons}
        bg_i1="bg-customBlue-10"
        bg_i2="bg-secondary-175"
        bg_i3="bg-primary-40"
        editToggleModel={editToggleModel}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ClientTable;
