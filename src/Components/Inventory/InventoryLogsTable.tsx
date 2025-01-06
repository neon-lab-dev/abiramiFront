import Table from "../Shared/Table/Table";

const InventoryLogsTable = () => {
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
      const sampleData = [
        {
          updated_date: new Date("2024-12-01"), // Date object
          description: "Item A - Electronics",
          sell_quantity: 50,
          buy_quantity: 30,
        },
        {
          updated_date: new Date("2024-12-15"),
          description: "Item B - Furniture",
          sell_quantity: 20,
          buy_quantity: 40,
        },
        {
          updated_date: new Date("2024-12-10"),
          description: "Item C - Groceries",
          sell_quantity: 100,
          buy_quantity: 90,
        },
        {
          updated_date: new Date("2024-11-25"),
          description: "Item D - Clothing",
          sell_quantity: 75,
          buy_quantity: 55,
        },
        {
          updated_date: new Date("2024-12-05"),
          description: "Item E - Accessories",
          sell_quantity: 60,
          buy_quantity: 20,
        },
      ];
      
  return (
    <div>
      <Table
        data={sampleData}
        columns={columns}
        tableName="Recent Invoice"
        showViewAll={false}
        enablePagination={false}
        rowsPerPage={5}
      />
    </div>
  );
};

export default InventoryLogsTable;
