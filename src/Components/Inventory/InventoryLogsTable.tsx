import Table from "../Shared/Table/Table";

interface InventoryLog {
  updated_date: Date;
  description: string;
  sell_quantity: number;
  buy_quantity: number;
}

interface InventoryLogsTableProps {
  data: InventoryLog[];
}

const InventoryLogsTable: React.FC<InventoryLogsTableProps> = ({ data }) => {
  const columns = [
    {
      header: "Updated Date",
      accessor: "updated_date",
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
      accessor: "description",
      cellClassName: "text-customBlue-20",
      width: "260px",
    },
    {
      header: "Sell",
      accessor: "sell_quantity",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
    },
    {
      header: "Buy",
      accessor: "buy_quantity",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
    },
  ];

  return (
    <div>
      <Table
        data={data} // Now using the passed `data` prop
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
