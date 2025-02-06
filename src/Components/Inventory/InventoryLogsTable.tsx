import { Log } from "../../types/logs";
import Table from "../Shared/Table/Table";

const InventoryLogsTable = ({ data }: { data: Log[] }) => {
  const columns = [
    {
      header: "Updated Date",
      accessor: "updatedAt",
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
      header: "Description",
      accessor: "comments",
      cellClassName: "text-customBlue-20",
      width: "360px",
    },
    {
      header: "Transaction Type",
      accessor: "txnType",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "160px",
    },
    {
      header: "Units",
      accessor: "txnUnits",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "160px",
    },
  ];

  return (
    <div>
      <Table
        data={data}
        columns={columns}
        tableName="Inventory Logs"
        showViewAll={false}
        enablePagination={false}
        rowsPerPage={5}
      />
    </div>
  );
};

export default InventoryLogsTable;
