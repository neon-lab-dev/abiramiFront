import React, { useState, useEffect } from "react";
import Table from "../../Components/Shared/Table/Table";
import { ICONS } from "../../assets/index";
import DownloadButton from "../../Components/Shared/Table/DownloadExcelBtn";
import Button from "../../Components/Shared/Button/Button";
import InventoryLogsTable from "../../Components/Inventory/InventoryLogsTable";
import {
  deleteClient,
  deleteInventory,
  getInventoryByCategoryId,
} from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { InventoryItem } from "../../types/inventory";
import { Category, CategoryResponse } from "../../types/category";
import UpdateModel from "./UpdateModel";
import Loader from "../../lib/loader";
import { handleSort } from "../../utils";

const InventoryListPageTable: React.FC = () => {
  const { id } = useParams();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isInventoryLogsOpen, setInventoryLogsOpen] = useState(false);

  const [category, setCategory] = useState<Category>();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();

  const editToggleModel = (id?: string) => {
    setEditModalOpen(!isEditModalOpen);
    setSelectedId(id);
  };
  const LogToggleModel = () => {
    setInventoryLogsOpen(!isInventoryLogsOpen);
  };
  const handleActionClick = (actionType: string, item: InventoryItem) => {
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

  // const data: InventoryItem[] = [
  //   {
  //     refrence: "kjsdgnbj",
  //     category: "PAID",
  //     description: "ljadbvilhb4jh345kj4n",
  //     quantity: 2,
  //     quantityType: "pieces",
  //     alarm: 6,
  //     buying_cost: 985735689,
  //     updated_date: new Date(2024, 1, 10),
  //     selling_cost: 985735689,
  //     image: "https://picsum.photos/200/300",
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     refrences: "kjsdgnbj",
  //     category: "PENDING",
  //     description: "ljadbvilhb4jh345kj4n",
  //     quantity: 67,
  //     quantityType: "pieces",
  //     alarm: 6,
  //     buying_cost: 985735689,
  //     updated_date: new Date(2024, 2, 12),
  //     selling_cost: 985735689,
  //     image: "https://picsum.photos/200/300",
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     refrences: "kjsdgnbj",
  //     category: "PAID",
  //     description: "ljadbvilhb4jh345kj4n",
  //     quantity: 787,
  //     quantityType: "pieces",
  //     alarm: 6,
  //     buying_cost: 985735689,
  //     updated_date: new Date(2024, 2, 18),
  //     selling_cost: 985735689,
  //     image: "https://picsum.photos/200/300",
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     refrences: "kjsdgnbj",
  //     category: "PAID",
  //     description: "ljadbvilhb4jh345kj4n",
  //     quantity: 67,
  //     quantityType: "pieces",
  //     alarm: 6,
  //     buying_cost: 985735689,
  //     updated_date: new Date(2024, 3, 10),
  //     selling_cost: 985735689,
  //     image: "https://picsum.photos/200/300",
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     refrences: "kjsdgnbj",
  //     category: "PENDING",
  //     description: "ljadbvilhb4jh345kj4n",
  //     quantity: 87,
  //     quantityType: "pieces",
  //     alarm: 6,
  //     buying_cost: 985735689,
  //     updated_date: new Date(2024, 1, 10),
  //     selling_cost: 985735689,
  //     image: "https://picsum.photos/200/300",
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     refrences: "kjsdgnbj",
  //     category: "PENDING",
  //     description: "ljadbvilhb4jh345kj4n",
  //     quantity: 87,
  //     quantityType: "pieces",
  //     alarm: 6,
  //     buying_cost: 985735689,
  //     updated_date: new Date(2024, 12, 10),
  //     selling_cost: 985735689,
  //     image: "https://picsum.photos/200/300",
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     refrences: "kjsdgnbj",
  //     category: "PENDING",
  //     description: "ljadbvilhb4jh345kj4n",
  //     quantity: 787,
  //     quantityType: "pieces",
  //     alarm: 6,
  //     buying_cost: 985735689,
  //     updated_date: new Date(2024, 11, 10),
  //     selling_cost: 985735689,
  //     image: "https://picsum.photos/200/300",
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     refrences: "kjsdgnbj",
  //     category: "PENDING",
  //     description: "ljadbvilhb4jh345kj4n",
  //     quantity: 87,
  //     quantityType: "pieces",
  //     alarm: 6,
  //     buying_cost: 985735689,
  //     updated_date: new Date(2024, 2, 15),
  //     selling_cost: 985735689,
  //     image: "https://picsum.photos/200/300",
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     refrences: "kjsdgnbj",
  //     category: "DRAFT",
  //     description: "ljadbvilhb4jh345kj4n",
  //     quantity: 87,
  //     quantityType: "pieces",
  //     alarm: 6,
  //     buying_cost: 985735689,
  //     updated_date: new Date(2024, 2, 16),
  //     selling_cost: 985735689,
  //     image: "https://picsum.photos/200/300",
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     refrences: "kjsdgnbj",
  //     category: "DRAFT",
  //     description: "ljadbvilhb4jh345kj4n",
  //     quantity: 787,
  //     quantityType: "pieces",
  //     alarm: 6,
  //     buying_cost: 985735689,
  //     updated_date: new Date(2024, 2, 4),
  //     selling_cost: 985735689,
  //     image: "https://picsum.photos/200/300",
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },

  //   {
  //     refrences: "kjsdgnbj",
  //     category: "DRAFT",
  //     description: "ljadbvilhb4jh345kj4n",
  //     quantity: 0,
  //     quantityType: "pieces",
  //     alarm: 6,
  //     buying_cost: 985735689,
  //     updated_date: new Date(2024, 2, 10),
  //     selling_cost: 985735689,
  //     image: "https://picsum.photos/200/300",
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  //   {
  //     refrences: "kjsdgnbj",
  //     category: "DRAFT",
  //     description: "ljadbvilhb4jh345kj4n",
  //     quantity: 787,
  //     quantityType: "pieces",
  //     alarm: 6,
  //     buying_cost: 985735689,
  //     updated_date: new Date(2024, 2, 10),
  //     selling_cost: 985735689,
  //     image: "https://picsum.photos/200/300",
  //     i1: true,
  //     i2: true,
  //     i3: true,
  //     iconsOrder: ["i1", "i2", "i3"],
  //   },
  // ];
  const [sortedData, setSortedData] = useState(inventory); // Initial data array

  const handleSort = (inventory, order: "asc" | "desc"): void => {
    const sorted = [...sortedData].sort(
      (a: InventoryItem, b: InventoryItem) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);

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

  const handleQuantitySort = (
    data: Inventory[],
    order: "asc" | "desc"
  ): void => {
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
      width: "160px",
    },
    // {
    //   header: "Category",
    //   accessor: "category",
    //   icon1: ICONS.search,
    //   width: "142px",
    // },

    {
      header: "Description",
      accessor: "description",
      cellClassName: "text-customBlue-20",
      icon1: ICONS.search,
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
      onIcon1Click: () => handleQuantitySort(inventory, "asc"),
      onIcon2Click: () => handleQuantitySort(inventory, "desc"),
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
      onIcon1Click: () => handleSort(inventory, "asc"),
      onIcon2Click: () => handleSort(inventory, "desc"),
    },
  ];

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const data = await getInventoryByCategoryId(id);
        console.log(data);
        setInventory(data.data.inventory);
        setCategory(data.data);
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
      console.log("Item deleted!", response);
      if (response.status === 200) {
        alert("Inventory deleted Successfully!!!");
        navigate(0);
      }
    } else {
      console.log("Delete action canceled.");
    }
  };

  console.log(inventory);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <Table
            data={sortedData}
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
          />
          <div className=" flex justify-between">
            <div className="flex justify-between md:gap-4 gap-3">
              <Button
                text="Filter"
                imgSrc={ICONS.filterGray}
                color="border-neutral-80 border-2 bg-white text-[14px] text-black"
                iconClassName="h-[16px] w-[16px]"
                textClass="hidden"
              />
            </div>
            <DownloadButton data={inventory} />
          </div>
          {isEditModalOpen && (
            // <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            //   <div className="bg-white rounded-3xl p-6 w-[70%] h-[550px] shadow-lg overflow-y-scroll custom-scrollbar scroll-none">
            //     {/* heading */}
            //     <div className="flex justify-between pb-4 ">
            //       <span className="font-Inter font-[600] text-sm ">Edit</span>
            //       <img
            //         src={ICONS.close}
            //         alt=""
            //         onClick={editToggleModel}
            //         className=" cursor-pointer"
            //       />
            //     </div>

            //     {/* client information */}
            //     <div className="">
            //       <span className="font-Inter font-[600] text-sm ">
            //         Inventory Information
            //       </span>
            //       <div className="w-full pb-[22px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            //         <InputField
            //           label="Refrence"
            //           required={true}
            //           inputBg=""
            //           type="text"
            //           placeholder="Enter company name"
            //           name="refrence"
            //           value={formData.refrence}
            //           onChange={handleChange}
            //         />

            //         <div className="flex-2 relative" ref={dropdownRef}>
            //           <div className="" onClick={() => setShowDropdown2(true)}>
            //             <InputField
            //               label="Category"
            //               required={true}
            //               inputBg=""
            //               type="select"
            //               icon={ICONS.downArrow2}
            //               placeholder="Enter the category"
            //               name="category"
            //               value={formData.category}
            //               onChange={handleChange}
            //             />
            //           </div>
            //           {showDropdown2 && (
            //             <div className="absolute bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto scroll-none w-full mt-1 z-10">
            //               {categories.map((category) => (
            //                 <div
            //                   key={category.id} // Use category as the unique key
            //                   className="px-4 py-2 cursor-pointer hover:bg-secondary-150 hover:text-white"
            //                   onClick={() => handleStateSelect2(category.id)}
            //                 >
            //                   {category.name} {/* Display category */}
            //                 </div>
            //               ))}
            //             </div>
            //           )}
            //         </div>
            //         <div className=" relative group">
            //           <InputField
            //             label="Buying Cost"
            //             inputBg=""
            //             type="text"
            //             placeholder="Enter Buying Cost"
            //             name="buyingCost"
            //             value={formData.buyingCost}
            //             onChange={handleChange}
            //           />
            //         </div>

            //         <InputField
            //           label="Quantity"
            //           required={true}
            //           inputBg=""
            //           type="number"
            //           placeholder="Enter quantity"
            //           name="quantity"
            //           value={formData.quantity}
            //           onChange={handleChange}
            //         />
            //         <InputField
            //           label="Description"
            //           inputBg=""
            //           type="text"
            //           placeholder="Enter description"
            //           name="description"
            //           value={formData.description}
            //           onChange={handleChange}
            //         />
            //         <InputField
            //           label="SellingCost"
            //           inputBg=""
            //           type="number"
            //           placeholder="Enter Selling Cost"
            //           name="sellingCost"
            //           value={formData.sellingCost}
            //           onChange={handleChange}
            //         />
            //         <InputField
            //           label="Warehouse Location"
            //           inputBg=""
            //           type="text"
            //           placeholder="Enter the Warehouse Location"
            //           name="WarehouseLocation"
            //           value={formData.WarehouseLocation}
            //           onChange={handleChange}
            //         />
            //         <InputField
            //           label="Quantity Type"
            //           inputBg=""
            //           type="text"
            //           placeholder="Enter Quantity Type"
            //           name="quantityType"
            //           value={formData.quantityType}
            //           onChange={handleChange}
            //         />
            //         <InputField
            //           label="Alarm"
            //           inputBg=""
            //           type="number"
            //           placeholder="Enter Alarm"
            //           name="alarm"
            //           value={formData.alarm}
            //           onChange={handleChange}
            //         />
            //       </div>
            //       <div className="py-4 w-full flex justify-center">
            //         <UploadImage
            //           removeImage={removeImage}
            //           handleImageChange={handleImageChange}
            //           imagePreviews={imagePreviews}
            //         />
            //       </div>
            //     </div>

            //     <div className=" border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed mb-[22px]"></div>
            //     <div className="col-span-3 flex justify-center gap-4 my-8">
            //       <Button
            //         text="Clear Form"
            //         type="reset"
            //         color="text-primary-10 bg-none"
            //       />
            //       <Button
            //         text={isSubmitting ? "Updating..." : "Update Inventory"}
            //         type="submit"
            //         onClick={handleSubmit}
            //         color="bg-primary-10 text-white"
            //       />
            //     </div>

            //     {/* heading */}
            //     <span className="font-Inter font-[600] text-sm  ">
            //       Inventroy Logs
            //     </span>
            //     <div className="w-full  pb-[22px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            //       <div className="w-full flex items-center gap-4">
            //         <label className="flex items-center">
            //           <input
            //             type="radio"
            //             name="TRType"
            //             value="sell"
            //             checked={formData.TRType === "sell"}
            //             onChange={handleChange}
            //             className="form-radio text-primary-10"
            //           />
            //           <span className="ml-2">Sell</span>
            //         </label>
            //         <label className="flex items-center">
            //           <input
            //             type="radio"
            //             name="TRType"
            //             value="buy"
            //             checked={formData.TRType === "buy"}
            //             onChange={handleChange}
            //             className="form-radio text-primary-10"
            //           />
            //           <span className="ml-2">Buy</span>
            //         </label>
            //       </div>
            //       <InputField
            //         label="Transaction Units"
            //         required={true}
            //         inputBg=""
            //         type="number"
            //         placeholder="Enter Transaction Units"
            //         name="transactionUnits"
            //         value={formData.transactionUnits}
            //         onChange={handleChange}
            //       />
            //       <InputField
            //         label="Comment"
            //         required={false}
            //         inputBg=""
            //         type="text"
            //         placeholder="Enter comment"
            //         name="comment"
            //         value={formData.comment}
            //         onChange={handleChange}
            //       />{" "}
            //     </div>
            //     <div className=" border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed mb-[22px]"></div>
            //     <div className="col-span-3 flex justify-center gap-4 my-8">
            //       <Button
            //         text="Clear Form"
            //         type="reset"
            //         color="text-primary-10 bg-none"
            //       />
            //       <Button
            //         text="Update Logs"
            //         type="submit"
            //         color="bg-primary-10 text-white"
            //       />
            //     </div>
            //   </div>

            //   <div></div>
            // </div>
            <UpdateModel
              editToggleModel={editToggleModel}
              selectedId={selectedId}
            />
          )}
          {isInventoryLogsOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
              <div className="bg-white rounded-3xl p-6 w-[70%] h-[550px] shadow-lg overflow-y-scroll custom-scrollbar scroll-none">
                {/* heading */}
                <div className="flex justify-between pb-4 ">
                  <span className="font-Inter font-[600] text-sm ">
                    Inventory Logs
                  </span>
                  <img
                    src={ICONS.close}
                    alt=""
                    onClick={LogToggleModel}
                    className=" cursor-pointer"
                  />
                </div>
                <div className="w-full  pb-[22px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
                  <div className="text-black whitespace-nowrap overflow-hidden text-ellipsis">
                    Product Id:{" 7698"}
                  </div>

                  <div className="text-black whitespace-nowrap overflow-hidden text-ellipsis">
                    Available Quantity:{" 600"}
                  </div>
                </div>
                <div className=" border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed mb-[22px]"></div>
                <InventoryLogsTable />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InventoryListPageTable;
