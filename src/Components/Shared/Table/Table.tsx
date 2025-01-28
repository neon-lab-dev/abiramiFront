import React, { useEffect, useState } from "react";
import { ICONS } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { formatDateWithOrdinal } from "../../../utils";
import { useSearch } from "../../../context/SearchContext";

interface Column {
  header: string | JSX.Element;
  accessor: string;
  width?: string;
  cellClassName?: string | ((row: any) => string);
  cellRenderer?: (row: any) => JSX.Element;
  icon1?: string;
  icon2?: string;
  onIcon1Click?: () => void;
  onIcon2Click?: () => void;
}

interface TableProps {
  data: Array<Record<string, any>>;
  columns: Column[];
  tableName: string;
  showViewAll?: boolean;
  enablePagination?: boolean;
  rowsPerPage?: number;
  tableHeight?: string;
  tableWidth?: string;
  icons?: {
    i1: string;
    i2: string;
    i3: string;
  };
  bg_i1?: string;
  bg_i2?: string;
  bg_i3?: string;
  onActionClick?: any;
}

const formatDate = (date: Date) => {
  if (!(date instanceof Date)) return date; // Return as is if not a date
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Table: React.FC<TableProps> = ({
  data,
  columns,
  tableName,
  showViewAll,
  enablePagination = false,
  rowsPerPage = 5,
  tableWidth = "full",
  icons,
  tableHeight = "400px",
  bg_i1 = "bg-blue-500",
  bg_i2 = "bg-green-500",
  bg_i3 = "bg-red-500",
  editToggleModel,
  handleDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchQuery } = useSearch();
  const [searchedData, setSearchedData] = useState([]);
  useEffect(() => {
    const filteredData = data?.filter((item) => {
      return (
        item?.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.mobileNum?.includes(searchQuery) ||
        item?.addressLine1?.includes(searchQuery)
      );
    });
    console.log(searchQuery);
    if (searchQuery !== "") {
      setSearchedData(filteredData);
    } else {
      setSearchedData(data);
    }
  }, [searchQuery, data]);

  const totalPages = enablePagination
    ? Math.ceil(data?.length / rowsPerPage)
    : 1;
  const startIndex = enablePagination ? (currentPage - 1) * rowsPerPage : 0;
  const endIndex = enablePagination ? startIndex + rowsPerPage : data?.length;
  const currentData = enablePagination
    ? searchedData?.slice(startIndex, endIndex)
    : searchedData;

  const navigate = useNavigate();

  const handleNavigateToDetails = (id: string) => {
    navigate(`/clients/Detailpage/${id}`);
  };
  const handleNavigateToInvoiceDetails = (companyName: string) => {
    navigate(`/invoices/Detailpage`);
    console.log(companyName);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const i3CustomClass = (i1: boolean, i2: boolean, i3: boolean) => {
    if (i1 && i2 && i3) return;
    if (i1 && i2) return;
    if (i1 && i3) return "w-[54px] justify-between";
  };
  const i1CustomClass = (i1: boolean, i2: boolean, i3: boolean) => {
    if (i1 && i2 && i3) return;
    if (i1 && i2) return;
    if (i1 && i3) return "w-[55px]";
  };

  const onEditClick = (id: string) => {
    editToggleModel(id);
  };

  const onDeleteClick = (id: string) => {
    handleDelete(id);
  };

  return (
    <div
      className={` w-full overflow-x-scroll custom-scrollbar my-5 scrollbar-hide`}
    >
      <div className="w-full rounded-[24px] overflow-hidden bg-secondary-60 p-6 mr-6 shadow-tableShadow">
        <div className="w-[100%] flex justify-between items-center h-10">
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
          className={` overflow-x-auto ${
            !enablePagination ? "scrollbar-y-visible" : "scrollbar-hide"
          }  ${!enablePagination ? "overflow-y-auto " : ""} `}
          style={{ maxHeight: tableHeight, minWidth: tableWidth }}
        >
          <table className="min-w-full text-left border-separate border-spacing-y-1">
            <thead className="sticky top-0 bg-secondary-60 min-h-10">
              <tr className="">
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="pl-3 py-3 font-normal text-[14px] leading-[20px] text-neutral-85 whitespace-nowrap  text-ellipsis"
                    style={{ minWidth: col.width }}
                  >
                    <div className="flex items-center justify-between font-normal text-[14px] leading-[20px] text-neutral-85 whitespace-nowrap">
                      {col.header}
                      <div
                        className={`flex ${
                          col.icon1 && col.icon2
                            ? "flex-col items-center w-auto"
                            : ""
                        }`}
                      >
                        {[col.icon1, col.icon2]
                          .filter(Boolean)
                          .map((icon, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (index === 0 && col.onIcon1Click) {
                                  col.onIcon1Click(); // Call onIcon1Click if it's defined
                                } else if (index === 1 && col.onIcon2Click) {
                                  col.onIcon2Click(); // Call onIcon2Click if it's defined
                                }
                              }}
                              className="mt-1 p-0 flex items-center justify-center" // Optional padding adjustments
                            >
                              <img
                                src={icon}
                                alt={`${col.header} icon`}
                                className={`mt-1 ${
                                  col.icon1 && col.icon2
                                    ? "h-[6px] w-3"
                                    : "h-5 w-5"
                                }`}
                              />
                            </button>
                          ))}
                      </div>
                    </div>
                  </th>
                ))}
                {icons && (
                  <th
                    style={{ minWidth: "160px" }}
                    className="px-4 py-2 font-normal text-[14px] leading-[20px] text-neutral-85"
                  >
                    <div>Action</div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-secondary-60 ">
              {currentData?.map((row, rowIndex) => {
                return (
                  <tr
                    key={rowIndex}
                    className="rounded-lg border-secondary-60 border  bg-white transition-all min-h-10 "
                  >
                    {columns.map((col, colIndex) => {
                      return (
                        <td
                          key={colIndex}
                          className={`pr-4 pl-3 py-4 rounded-lg text-[14px] ${
                            typeof col.cellClassName === "function"
                              ? col.cellClassName(row)
                              : col.cellClassName || ""
                          }${colIndex === 0 ? "text-[#4186F3]" : ""} `}
                          style={{ width: col.width }}
                        >
                          {col.cellRenderer ? (
                            col.cellRenderer(row) // Use custom cellRenderer if defined
                          ) : col.accessor === "status" ? (
                            <span
                              className={`${
                                row.status.toUpperCase() === "ACTIVE"
                                  ? " text-neutral-90 bg-sucess-10"
                                  : "text-red-600 bg-red-100"
                              } px-2 py-1 rounded-xl`}
                            >
                              {row[col.accessor].toUpperCase()}
                            </span>
                          ) : col.accessor === "companyName" ? (
                            <span
                              className={`${
                                col.navigate === false
                                  ? ""
                                  : "text-blue-500 cursor-pointer hover:underline"
                              }`}
                              onClick={() => {
                                if (col.navigate === false) {
                                  return;
                                } else {
                                  handleNavigateToDetails(row.id);
                                }
                              }}
                            >
                              {row[col.accessor]}
                            </span>
                          ) : col.accessor === "invoice_id" ? (
                            <span
                              className="text-blue-500 cursor-pointer hover:underline"
                              onClick={() =>
                                handleNavigateToInvoiceDetails(
                                  row[col.accessor]
                                )
                              }
                            >
                              {row[col.accessor]}
                            </span>
                          ) : col.accessor === "quantity" ? (
                            <span
                              className={`${
                                row.quantity === 0
                                  ? "text-red-500 bg-red-100"
                                  : row.quantity <= row.alarm
                                  ? "text-yellow-500 bg-yellow-100"
                                  : "text-black bg-gray-200"
                              } px-2 py-1 rounded-xl text-center flex justify-center`}
                            >
                              {row[col.accessor]}
                            </span>
                          ) : typeof row[col.accessor] === "object" &&
                            row[col.accessor] instanceof Date ? (
                            formatDate(row[col.accessor])
                          ) : col.type === "date" ? (
                            formatDateWithOrdinal(row[col.accessor])
                          ) : (
                            row[col.accessor]
                          )}
                        </td>
                      );
                    })}
                    {/* {icons && (
                      <td>
                        <div className="flex px-4 space-x-2 ">
                          {row?.iconsOrder?.map((icon: string) => {
                            if (icon === "i1" && row.i1) {
                              return (
                                <div
                                  className={`${i1CustomClass(
                                    row.i1,
                                    row.i2,
                                    row.i3
                                  )} max-w-[46px] mr-${
                                    row.i1 && row.i2 && !row.i3 ? "2" : "0"
                                  }`}
                                >
                                  <button
                                    key="i1"
                                    onClick={() => onActionClick("i1", row)}
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
                                <div
                                  className={`flex items-center gap-${
                                    row.i1 && row.i2 && !row.i3 ? "4" : "2"
                                  } ml-${
                                    row.i1 && row.i2 && !row.i3 ? "4" : "2"
                                  }`}
                                >
                                  <img
                                    src={ICONS.graybar}
                                    alt="|"
                                    className="h-3 w-[2px]"
                                  />
                                  <button
                                    key="i2"
                                    onClick={() => onActionClick("i2", row)}
                                    className={`rounded-full h-6 w-6 flex items-center justify-center ${bg_i2}`}
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
                                <div
                                  className={`flex items-center gap-2 ml-0 ${i3CustomClass(
                                    row.i1,
                                    row.i2,
                                    row.i3
                                  )}`}
                                >
                                  <img
                                    src={ICONS.graybar}
                                    alt="|"
                                    className="h-3 w-[2px]"
                                  />
                                  <button
                                    key="i3"
                                    onClick={() => onActionClick("i3", row)}
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
                    )} */}
                    <td>
                      <div className="flex gap-4">
                        <button
                          key="i1"
                          // onClick={() => onEditClick(row.id)}
                          className={`rounded-full h-6 w-6 flex items-center justify-center  ${bg_i1}  `}
                        >
                          <img src={icons.i1} alt="Edit" className="h-4 w-4" />
                        </button>
                        <button
                          key="i2"
                          onClick={() => onEditClick(row.id)}
                          className={`rounded-full h-6 w-6 flex items-center justify-center  ${bg_i2}  `}
                        >
                          <img src={icons.i2} alt="Edit" className="h-4 w-4" />
                        </button>
                        <button
                          key="i3"
                          onClick={() => onDeleteClick(row.id)}
                          className={`rounded-full h-6 w-6 flex items-center justify-center  ${bg_i3}  `}
                        >
                          <img src={icons.i3} alt="Edit" className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td>
                      {/* <div className="flex px-4 space-x-2">
    {currentData.map((col, colIndex) => (
      <div key={colIndex}>
        {row.iconsOrder.map((icon: string) => {
          if (icon === "i1" && row.i1) {
            return (
              <div
                key="i1"
                className={`${i1CustomClass(row.i1, row.i2, row.i3)} max-w-[46px] mr-${
                  row.i1 && row.i2 && !row.i3 ? "2" : "0"
                }`}
              >
                <button
                  onClick={() => onActionClick("view", col)} // Pass 'col' here
                  className={`rounded-full h-6 w-6 flex items-center justify-center ${bg_i1}`}
                >
                  <img src={icons.i1} alt="Edit" className="h-3 w-3" />
                </button>
              </div>
            );
          }

          if (icon === "i2" && row.i2) {
            return (
              <div
                key="i2"
                className={`flex items-center gap-${
                  row.i1 && row.i2 && !row.i3 ? "4" : "2"
                } ml-${row.i1 && row.i2 && !row.i3 ? "4" : "2"}`}
              >
                <img src={ICONS.graybar} alt="|" className="h-3 w-[2px]" />
                <button
                  onClick={() => onActionClick("edit", col)} // Pass 'col' here
                  className={`rounded-full h-6 w-6 flex items-center justify-center ${bg_i2}`}
                >
                  <img src={icons.i2} alt="i2" className="h-3 w-3" />
                </button>
              </div>
            );
          }

          if (icon === "i3" && row.i3) {
            return (
              <div
                key="i3"
                className={`flex items-center gap-2 ml-0 ${i3CustomClass(row.i1, row.i2, row.i3)}`}
              >
                <img src={ICONS.graybar} alt="|" className="h-3 w-[2px]" />
                <button
                  onClick={() => onActionClick("delete", col)} // Pass 'col' here
                  className={`rounded-full h-6 w-6 flex items-center justify-center ${bg_i3}`}
                >
                  <img src={icons.i3} alt="i3" className="h-3 w-3" />
                </button>
              </div>
            );
          }

          return null;
        })}
      </div>
    ))}
  </div> */}
                    </td>
                  </tr>
                );
              })}
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
