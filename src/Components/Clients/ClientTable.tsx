import React, { useEffect, useState } from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";
import { Client, ClientResponse } from "../../types/client";

// Define Column Type (Make sure it's imported if defined elsewhere)
type Column = {
  header: string;
  accessor: string;
  cellClassName?: string;
  width?: string;
  type?: "date";
  format?: (value: any) => string;
  icon1?: string;
  icon2?: string;
  onIcon1Click?: () => void;
  onIcon2Click?: () => void;
  cellRenderer?: (row: any) => JSX.Element;
};

const ClientTable: React.FC<{
  clients: ClientResponse;
  editToggleModel?: (clientId?: string) => void;
  handleDelete?: (clientId: string) => void;
}> = ({ clients, editToggleModel, handleDelete }) => {
  const icons = {
    i1: ICONS.blueTick,
    i2: ICONS.editBlack,
    i3: ICONS.deleteRed,
  };

  const [sortedData, setSortedData] = useState<Client[]>(clients?.data || []);

  const handleSort = (order: "asc" | "desc"): void => {
    const sorted = [...sortedData].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortedData(sorted);
  };

  useEffect(() => {
    setSortedData(clients?.data || []);
  }, [clients]);

  const columns: Column[] = [
    {
      header: "Company Name",
      accessor: "companyName",
      cellClassName: "text-neutral-25",
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
      cellClassName: "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      icon1: ICONS.search,
      width: "160px",
    },
    {
      header: "Address",
      accessor: "address",
      width: "250px",
      cellRenderer: (row: Client) => (
        <span>
          {row.addressLine1 && <>{row.addressLine1} <br /></>}
          {row.addressLine2 && <>{row.addressLine2} <br /></>}
          {row.addressLine3 && <>{row.addressLine3}</>}
        </span>
      ),
    },
    {
      header: "Created Date",
      accessor: "createdAt",
      type: "date",
      cellClassName: "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      format: (value: Date) =>
        new Date(value).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      icon2: ICONS.downArrow2,
      icon1: ICONS.upArrow,
      width: "160px",
      onIcon1Click: () => handleSort("asc"),
      onIcon2Click: () => handleSort("desc"),
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
