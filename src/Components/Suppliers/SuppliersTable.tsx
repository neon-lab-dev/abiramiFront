import React, { useEffect, useState } from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";
import { getClients, getSuppliers } from "../../api/api";
import Loader from "../../lib/loader";

const SuppliersTable = ({ suppliers, editToggleModel, handleDelete }) => {
  const icons = {
    i1: ICONS.blueTick,
    i2: ICONS.editBlack,
    i3: ICONS.deleteRed,
  };

  const columns = [
    {
      header: "Company Name",
      accessor: "companyName",
      cellClassName: "text-black",
      navigate: false,
    },
    {
      header: "Title/Item",
      accessor: "title",
      cellClassName: "text-black",
    },
    {
      header: "GST",
      accessor: "GST",
      cellClassName: "text-black",
      icon1: ICONS.search,
    },
    {
      header: "Mobile No.",
      accessor: "mobileNum",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      icon1: ICONS.search,
    },
    {
      header: "Address",
      accessor: "addressLine1",
      cellClassName: "text-black",
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
    },
    {
      header: "Status",
      accessor: "status",
    },
  ];

  return (
    <>
      <div>
        <Table
          data={suppliers}
          columns={columns}
          tableName="Recent Invoice"
          showViewAll={false}
          enablePagination={true}
          rowsPerPage={5}
          icons={icons}
          bg_i1="bg-customBlue-10"
          bg_i2="bg-customBlue-10"
          bg_i3="bg-primary-40"
          editToggleModel={editToggleModel}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default SuppliersTable;
