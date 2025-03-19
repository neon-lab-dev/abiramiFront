/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import Table from "../../Components/Shared/Table/Table";
import { ICONS } from "../../assets/index";
import DownloadButton from "../../Components/Shared/Table/DownloadExcelBtn";
import Button from "../../Components/Shared/Button/Button";
import { deleteInventory, getInventoryByCategoryId, } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { InventoryDownloadItem, InventoryItem } from "../../types/inventory";
import { Category } from "../../types/category";
import UpdateModel from "./UpdateModel";
import Loader from "../../lib/loader";

import { useSearch } from "../../context/SearchContext";
import InventoryLogsModal from "./inventoyLogsModel";

interface ISearch {
  searchQuery: string;
  searchResults: { data: InventoryItem[] };
}

const InventoryListPageTable = () => {
  const { id } = useParams();
  const { searchQuery, searchResults }: ISearch = useSearch();
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isInventoryLogsOpen, setInventoryLogsOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<Category>();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [inventoryDownload, setInventoryDownload] = useState<InventoryDownloadItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedLogId, setSelectedLogId] = useState<string>("");
  const navigate = useNavigate();

  const editToggleModel = (id?: string) => {
    setEditModalOpen(!isEditModalOpen);
    setSelectedId(id || "");
  };
  const LogToggleModel = (id?: string) => {
    setInventoryLogsOpen(!isInventoryLogsOpen);
    setSelectedLogId(id || "");
  };
  const handleActionClick = (actionType: string) => {
    switch (actionType) {
      case "i1":
       
        setInventoryLogsOpen(!isInventoryLogsOpen);
        
        break;
      case "i2":
        setEditModalOpen(!isEditModalOpen);

        break;
      case "i3":
        // alert(`Delete clicked for ${item.quantity}`);
        break;
      default:
        console.log("Unknown action");
    }
  };
  const formatCurrency = (value: number) => {
    return `₹ ${value?.toLocaleString()}`;
  };

  const icons = {
    i1: ICONS.blueTick,
    i2: ICONS.editBlack,
    i3: ICONS.deleteRed,
  };

  
  
  const [sortedData, setSortedData] = useState(inventory); // Initial data array

  const handleSort = (order: "asc" | "desc"): void => {
    const sorted = [...sortedData].sort(
      (a: InventoryItem, b: InventoryItem) => {
        const dateA = new Date(a.updatedAt || 0);
        const dateB = new Date(b.updatedAt || 0);

        if (order === "asc") {
          return dateA.getTime() - dateB.getTime(); // Convert dates to timestamps
        } else if (order === "desc") {
          return dateB.getTime() - dateA.getTime(); // Convert dates to timestamps
        }
        return 0;
      }
    );

    setSortedData(sorted);
  };

  const handleQuantitySort = (order: "asc" | "desc"): void => {
    const sorted = [...sortedData].sort((a, b) => {
      if (order === "asc") {
        return a.quantity - b.quantity;
      } else if (order === "desc") {
        return b.quantity - a.quantity;
      }
      return 0;
    });

    setSortedData(sorted);
  };

  const columns = [
    {
      header: "Refrences",
      accessor: "refrence",
      cellClassName: " text-black ",
      icon1: ICONS.search,
      width: "160px",
    },

    {
      header: "Description",
      accessor: "description",
      cellClassName: "text-customBlue-20",
      width: "160px",
    },

    {
      header: "Quantity",
      accessor: "quantity",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      icon2: ICONS.downArrow2,
      icon1: ICONS.upArrow,
      width: "120px",
      onIcon1Click: () => handleQuantitySort("asc"),
      onIcon2Click: () => handleQuantitySort("desc"),
    },

    {
      header: "Quantity Type",
      accessor: "quantityType",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "120px",
    },
    {
      header: "Alarm",
      accessor: "alarm",
      cellClassName: "text-black text-center",
      width: "90px",
    },

    {
      header: "Buying Cost",
      accessor: "buyingCost",
      cellRenderer: (row: InventoryItem) => {
        return (
          <span className="text-black">{formatCurrency(row.buyingCost)}</span>
        );
      },
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "130px",
    },
    {
      header: "Selling Cost",
      accessor: "sellingCost",
      cellRenderer: (row: InventoryItem) => {
        return (
          <span className="text-black">{formatCurrency(row.sellingCost)}</span>
        );
      },
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "130px",
    },
    {
      header: "Image",
      accessor: "image", // Add an image accessor
      cellRenderer: (row: InventoryItem) => {
        // Assuming the image URL or path is stored in the `image` field of the data
        return (
          <>
            {row?.image && (
              <img
                src={row?.image?.url || ""}
                alt="Item"
                className="w-12 h-12 object-cover rounded" // Styling for the image
              />
            )}
          </>
        );
      },
      cellClassName: "text-black",
      width: "120px",
    },
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
      icon1: ICONS.upArrow,
      icon2: ICONS.downArrow2,
      width: "180px",
      onIcon1Click: () => handleSort("asc"),
      onIcon2Click: () => handleSort("desc"),
    },
  ];

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        if (id) {
          const data = await getInventoryByCategoryId(id);
          setInventory(data.data.inventory);
          
          setCategory(data.data);
          console.log(data)
          const inventoryData = data.data.inventory.map((inventoryDownload: InventoryDownloadItem) => ({
            refrence: inventoryDownload.refrence,
            quantity: inventoryDownload.quantity,
            description: inventoryDownload.description,
            warehouseLocation: inventoryDownload.warehouseLocation,
            categoryName: data.data.name, // Inject category name here
          }));
          setInventoryDownload(inventoryData);
          
          console.log(category);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, [id]);

  useEffect(() => {
    setSortedData(inventory);
  }, [inventory]);

  const handleDelete = async (id?: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await deleteInventory(id || "");
      if (response.status === 200) {
        alert("Inventory deleted Successfully!!!");
        navigate(0);
      }
    } else {
      console.log("Delete action canceled.");
    }
  };
  const handleNavigateToCreateInventory = () => {
    navigate("/inventory/createInventory");
  };
  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="flex justify-between">
            <div>    InventoryTable</div>
          <Button
              text="Create Inventory"
              imgSrc={ICONS.inventory}
              color="bg-secondary-120 text-[14px] text-secondary-125"
              iconClassName="flex h-[24px] w-[24px] justify-end"
              onClick={handleNavigateToCreateInventory}
            />
          </div>
      
          
          <Table
            // data={sortedData}
            data={
              searchQuery.trim() === "" || searchResults?.data?.length < 1
                ? sortedData
                : searchResults.data
            }
            columns={columns}
            tableName="Recent Invoice"
            showViewAll={false}
            enablePagination={false}
            rowsPerPage={5}
            icons={icons}
            bg_i1="bg-customBlue-10"
            bg_i2="bg-neutral-65"
            bg_i3="bg-primary-40"
            onActionClick={handleActionClick}
            editToggleModel={editToggleModel}
            handleDelete={handleDelete}
            LogToggleModel={LogToggleModel}
          />
          <div className=" flex justify-between">
            <DownloadButton data={inventoryDownload} />
          </div>
          {isEditModalOpen && (
            <UpdateModel
              editToggleModel={editToggleModel}
              selectedId={selectedId}
            />
          )}
          {isInventoryLogsOpen && (
  <InventoryLogsModal
    isOpen={isInventoryLogsOpen}
    LogToggleModal={() => setInventoryLogsOpen(false)}
    selectedId={selectedLogId}
  />
)}

        </div>
      )}
    </>
  );
};

export default InventoryListPageTable;
