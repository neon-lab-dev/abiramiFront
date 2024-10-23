import React, { useState } from "react";
import { ICONS } from "../../../assets";

interface Column {
  header: string;
  accessor: string;
  width?: string;
  cellClassName?: string | ((row: any) => string);
  cellRenderer?: (row: any) => JSX.Element;
  icon1?: string;
  icon2?:string;
}

interface TableProps {
  data: Array<Record<string, any>>;
  columns: Column[];
  tableName: string;
  showViewAll?: boolean;
  enablePagination?: boolean;
  rowsPerPage?: number;
  tableHeight?: string;
  icons: {
    i1: string;
    i2: string;
    i3: string;
  };
  bg_i1 : string;
  bg_i2 : string;
  bg_i3 : string;
}

const formatDate = (date: Date) => {
  if (!(date instanceof Date)) return date; // Return as is if not a date
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const Table: React.FC<TableProps> = ({
  data,
  columns,
  tableName,
  showViewAll,
  enablePagination = false,
  rowsPerPage = 5,
  icons,
  tableHeight="400px",
  bg_i1 = "bg-blue-500", 
  bg_i2 = "bg-green-500", 
  bg_i3 = "bg-red-500",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = enablePagination
    ? Math.ceil(data.length / rowsPerPage)
    : 1;
  const startIndex = enablePagination ? (currentPage - 1) * rowsPerPage : 0;
  const endIndex = enablePagination ? startIndex + rowsPerPage : data.length;
  const currentData = enablePagination
    ? data.slice(startIndex, endIndex)
    : data;

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEdit = (row: Record<string, any>) => {
    console.log("Edit clicked for:", row);
  };
  
  const handleApprove = (row: Record<string, any>) => {
    console.log("Approve clicked for:", row);
  };
  
  const handleDelete = (row: Record<string, any>) => {
    console.log("Delete clicked for:", row);
  };
  const i3CustomClass=(i1: boolean, i2: boolean, i3: boolean)=>{
    if (i1 && i2 && i3)
      return;
    if(i1 && i2)
      return;
    if  (i1 && i3) 
  return "w-[70px] justify-between";
  }
  const i1CustomClass=(i1: boolean, i2: boolean, i3: boolean)=>{
    if (i1 && i2 && i3)
      return;
    if(i1 && i2)
      return ;
    if  (i1 && i3) 
  return "w-[55px]";
  }
  return (
    <div className={` w-full my-5`}>
      <div className="w-full rounded-[24px] overflow-hidden bg-secondary-60 p-6 shadow-tableShadow">
      <div className="w-[95%] md:w-[97%] lg:w-[100%] flex justify-between items-center h-10">
        <div className="font-semibold text-[14px] leading-[20px] whitespace-nowrap overflow-hidden text-ellipsis">
          {tableName}
        </div>
        {showViewAll && (
          <button className="flex items-center px-2 py-1 md:px-3 md:py-2 font-normal text-base leading-6 bg-neutral-70 transition-all rounded-xl">
            View all
            <img src={ICONS.downArrow} alt="" className="ml-2 w-5 h-5" />
          </button>
        )}
      </div>

      {/* Wrapper to enable horizontal scrolling */}
      <div
          className={` overflow-x-auto scrollbar-hide ${!enablePagination ? "overflow-y-auto " : ""} `}
          style={{ maxHeight: tableHeight }}
        >
        <table className="min-w-full text-left border-separate border-spacing-y-1">
          <thead className="sticky top-0 bg-secondary-60 min-h-10">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-3 font-normal text-[14px] leading-[20px] text-neutral-85"
                  style={{ width: col.width }}
                >
                  <div className="flex items-center justify-between font-normal text-[14px] leading-[20px] text-neutral-85">
                    {col.header}
                    {col.icon1 && (
                      <img
                        src={col.icon1}
                        alt={`${col.header} icon`}
                        className="mr-2 w-5 h-5"
                      />
                    )}
                    {col.icon2 && (
                      <img
                        src={col.icon2}
                        alt={`${col.header} icon`}
                        className="mr-2 w-5 h-5"
                      />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-2 font-normal text-[14px] leading-[20px] text-neutral-85">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-secondary-60 ">
            {currentData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="rounded-lg border-secondary-60 border  bg-white transition-all min-h-10"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-4 rounded-lg ${
                      typeof col.cellClassName === "function"
                        ? col.cellClassName(row)
                        : col.cellClassName || ""
                    }`}
                    style={{ width: col.width }}
                  >
                     {col.cellRenderer
                        ? col.cellRenderer(row) // Use custom cellRenderer if defined
                        : col.accessor === "status" ? (
                      <span
                        className={`${
                          row.status === "Active"
                            ? " text-neutral-90 bg-sucess-10"
                            : "text-red-600 bg-red-100"
                        } px-2 py-1 rounded-xl`}
                      >
                        {row[col.accessor]}
                      </span>
                    ) :(
                      (typeof row[col.accessor] === 'object' && row[col.accessor] instanceof Date) 
                      ? formatDate(row[col.accessor]):
                      row[col.accessor]
                    )}
                  </td>
                ))}
                <td>
                  <div className="flex px-4 space-x-4 ">
                    {row.iconsOrder.map((icon:string) => {
                      if (icon === "i1" && row.i1) {
                        return (
                          <div className={`${i1CustomClass(row.i1, row.i2, row.i3)}`}>
                          <button
                            key="i1"
                            onClick={() => handleEdit(row)}
                            
                            className={`rounded-full h-6 w-6 flex items-center justify-center  ${bg_i1}  `}
                          >
                            <img
                              src={icons.i1}
                              alt="Edit"
                              className="h-3 w-3"
                            />
                          </button>
                          </div>
                        );
                      }
                      
                     
                      if (icon === "i2" && row.i2) {
                        return (
                          <div className="flex items-center gap-4 ml-4">
                          <img src={ICONS.graybar} alt="|" className="h-3 w-[2px]"/>
                          <button
                            key="i2"
                            onClick={() => handleApprove(row)}
                            className={`rounded-full h-6 w-6 flex items-center justify-center ${bg_i2}   `}
                          >
                            <img
                              src={icons.i2}
                              alt="i2"
                              className="h-3 w-3"
                            />
                          </button>
                          </div>
                        );
                      }
                      
                      if (icon === "i3" && row.i3) {
                        return (
                          <div className={`flex items-center gap-4 ml-4 w- ${i3CustomClass(row.i1, row.i2, row.i3)}`}>
                          <img src={ICONS.graybar} alt="|" className="h-3 w-[2px]"/>
                          <button
                            key="i3"
                            onClick={() => handleDelete(row)}
                            className={`rounded-full h-6 w-6 flex items-center justify-center ${bg_i3}  `}
                          >
                            <img
                              src={icons.i3}
                              alt="i3"
                              className="h-3 w-3"
                            />
                          </button>
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
   {/* Pagination Controls */}
   {enablePagination && (
        <div
          className={`flex justify-center ${
            currentPage < totalPages ? "" : ""
          } md:justify-end items-center mt-4`}
        >
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="text-black mx-3 my-2 disabled:opacity-50 flex items-center"
          >
            <img src={ICONS.leftArrowBlack} alt="" className="ml-2 w-5 h-5" />
            Previous
          </button>

          {currentPage > 2 && <span className="mx-2">...</span>}

          {[currentPage - 1, currentPage, currentPage + 1].map(
            (page, index) => {
              if (page < 1 || page > totalPages) return null;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={`text-black w-10 h-10 ${
                    page === currentPage
                      ? "border-2 rounded-lg border-secondary-80"
                      : ""
                  }`}
                >
                  {page}
                </button>
              );
            }
          )}

          {currentPage < totalPages - 1 && <span className="mx-2">...</span>}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="text-black mx-3 my-2 disabled:opacity-50 flex items-center"
          >
            Next{" "}
            <img src={ICONS.rightArrowBlack} alt="" className="ml-2 w-5 h-5" />
          </button>
        </div>
      )} 
    </div>
    
  );
};

export default Table;
