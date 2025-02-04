import React, { useEffect, useState } from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";
import { ClientResponse } from "../../types/client";

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

const ClientTable: React.FC<{
  clients: ClientResponse | object;
  editToggleModel?: (clientId: string) => void;
  handleDelete?: (clientId: string) => void;
}> = ({ clients, editToggleModel, handleDelete }) => {
  const icons = {
    i1: ICONS.blueTick,
    i2: ICONS.editBlack,
    i3: ICONS.deleteRed,
  };

  const [sortedData, setSortedData] = useState<Client[]>(clients?.data);

  const handleSort = (data: Client[], order: "asc" | "desc"): void => {
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

  useEffect(() => {
    setSortedData(clients?.data);
  }, [clients]);

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
      icon1: ICONS.search,
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
