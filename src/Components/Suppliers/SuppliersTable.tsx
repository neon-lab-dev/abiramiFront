import React, { useEffect, useState } from "react";
import Table from "../Shared/Table/Table";
import { ICONS } from "../../assets/index";
import { getClients, getSuppliers } from "../../api/api";
import Loader from "../../lib/loader";

const SuppliersTable = ({ suppliers, editToggleModel, handleDelete }) => {
  const [sortedData, setSortedData] = useState(suppliers);
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
      width: "200px",
    },
    {
      header: "Title/Item",
      accessor: "title",
      cellClassName: "text-black",
      width: "200px",
    },
    {
      header: "GST",
      accessor: "GST",
      cellClassName: "text-black",
      width: "140px",
    },
    {
      header: "Mobile No.",
      accessor: "mobileNum",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      icon1: ICONS.search,
      width: "140px",
    },
    {
      header: "Address",
      accessor: "addressLine1",
      cellClassName: "text-black",
      icon1: ICONS.search,
      width: "200px",
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
      width: "160px",
    },
    {
      header: "Status",
      accessor: "status",
      width: "200px",
    },
  ];

  useEffect(() => {
    setSortedData(suppliers);
  }, [suppliers]);

  return (
    <>
      <div>
        <Table
          data={sortedData}
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
