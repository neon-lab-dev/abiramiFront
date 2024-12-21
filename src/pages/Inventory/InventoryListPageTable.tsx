import React ,{ useState,useRef,useEffect } from "react";
import Table from "../../Components/Shared/Table/Table";
import { ICONS } from "../../assets/index";
import DownloadButton from "../../Components/Shared/Table/DownloadExcelBtn";
import Button from "../../Components/Shared/Button/Button";
import InputField from "../../Components/Shared/InputField/InputField";
import UploadImage from "./UploadImage";

// Define a type for the row data
interface Inventory {
  refrences: string;
  category: string;
  description: string;
  quantity: number;
  quantityType: string;
  alarm: number;
  buying_cost: number;
  selling_cost: number;
  image: string;
  updated_date: Date;
  i1: boolean;
  i2: boolean;
  i3: boolean;
  iconsOrder: string[];
}

const InventoryListPageTable: React.FC = () => {
    
    const [showDropdown2, setShowDropdown2] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const Catagory  = [
    "C1" ,
    "C2" ,
   "C3" ,
    "C4" ,
  ];
  const [formData, setFormData] = useState({
    refrence: "",
    category: "",
    description: "",
    buyingCost: "",
    quantity: "",
    quantityType: "",
    alarm: "",
    sellingCost: "",
    gstNo: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
    status: "active",
    image:imageFiles
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFiles((prev) => [...prev, file]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = (url: string) => {
    setImagePreviews((prev) => prev.filter((preview) => preview !== url));
  };

  const editToggleModel = () => {
    setEditModalOpen(!isEditModalOpen);
  }
  const handleActionClick = (actionType: string, item: Inventory) => {
    switch (actionType) {
      case "i1":
        alert(`View clicked for ${item.quantity}`);
        break;
      case "i2":
        setEditModalOpen(!isEditModalOpen);

        break;
      case "i3":
        alert(`Delete clicked for ${item.quantity}`);
        break;
      default:
        console.log("Unknown action");
    }
  };
  const formatCurrency = (value: number) => {
    return `₹ ${value.toLocaleString()}`;
  };

  const icons = {
    i1: ICONS.blueTick,
    i2: ICONS.editBlack,
    i3: ICONS.deleteRed,
  };

  const data: Inventory[] = [
    {
      refrences: "kjsdgnbj",
      category: "PAID",
      description: "ljadbvilhb4jh345kj4n",
      quantity: 2,
      quantityType: "pieces",
      alarm: 6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 1, 10),
      selling_cost: 985735689,
      image: "https://picsum.photos/200/300",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PENDING",
      description: "ljadbvilhb4jh345kj4n",
      quantity: 67,
      quantityType: "pieces",
      alarm: 6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 12),
      selling_cost: 985735689,
      image: "https://picsum.photos/200/300",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PAID",
      description: "ljadbvilhb4jh345kj4n",
      quantity: 787,
      quantityType: "pieces",
      alarm: 6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 18),
      selling_cost: 985735689,
      image: "https://picsum.photos/200/300",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PAID",
      description: "ljadbvilhb4jh345kj4n",
      quantity: 67,
      quantityType: "pieces",
      alarm: 6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 3, 10),
      selling_cost: 985735689,
      image: "https://picsum.photos/200/300",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PENDING",
      description: "ljadbvilhb4jh345kj4n",
      quantity: 87,
      quantityType: "pieces",
      alarm: 6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 1, 10),
      selling_cost: 985735689,
      image: "https://picsum.photos/200/300",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PENDING",
      description: "ljadbvilhb4jh345kj4n",
      quantity: 87,
      quantityType: "pieces",
      alarm: 6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 12, 10),
      selling_cost: 985735689,
      image: "https://picsum.photos/200/300",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PENDING",
      description: "ljadbvilhb4jh345kj4n",
      quantity: 787,
      quantityType: "pieces",
      alarm: 6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 11, 10),
      selling_cost: 985735689,
      image: "https://picsum.photos/200/300",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "PENDING",
      description: "ljadbvilhb4jh345kj4n",
      quantity: 87,
      quantityType: "pieces",
      alarm: 6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 15),
      selling_cost: 985735689,
      image: "https://picsum.photos/200/300",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "DRAFT",
      description: "ljadbvilhb4jh345kj4n",
      quantity: 87,
      quantityType: "pieces",
      alarm: 6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 16),
      selling_cost: 985735689,
      image: "https://picsum.photos/200/300",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "DRAFT",
      description: "ljadbvilhb4jh345kj4n",
      quantity: 787,
      quantityType: "pieces",
      alarm: 6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 4),
      selling_cost: 985735689,
      image: "https://picsum.photos/200/300",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },

    {
      refrences: "kjsdgnbj",
      category: "DRAFT",
      description: "ljadbvilhb4jh345kj4n",
      quantity: 0,
      quantityType: "pieces",
      alarm: 6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 10),
      selling_cost: 985735689,
      image: "https://picsum.photos/200/300",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
    {
      refrences: "kjsdgnbj",
      category: "DRAFT",
      description: "ljadbvilhb4jh345kj4n",
      quantity: 787,
      quantityType: "pieces",
      alarm: 6,
      buying_cost: 985735689,
      updated_date: new Date(2024, 2, 10),
      selling_cost: 985735689,
      image: "https://picsum.photos/200/300",
      i1: true,
      i2: true,
      i3: true,
      iconsOrder: ["i1", "i2", "i3"],
    },
  ];
  const [sortedData, setSortedData] = useState(data); // Initial data array

  const handleSort = (data: Inventory[], order: "asc" | "desc"): void => {
    const sorted = [...sortedData].sort((a, b) => {
      const dateA = new Date(a.updated_date);
      const dateB = new Date(b.updated_date);

      if (order === "asc") {
        return dateA.getTime() - dateB.getTime(); // Convert dates to timestamps
      } else if (order === "desc") {
        return dateB.getTime() - dateA.getTime(); // Convert dates to timestamps
      }
      return 0;
    });

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
      accessor: "refrences",
      cellClassName: " text-black ",
      width: "106px",
    },
    {
      header: "Category",
      accessor: "category",
      icon1: ICONS.search,
      width: "142px",
    },

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
      width: "90px",
      onIcon1Click: () => handleQuantitySort(data, "asc"),
      onIcon2Click: () => handleQuantitySort(data, "desc"),
    },

    {
      header: "Quantity Type",
      accessor: "quantityType",
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "102px",
    },
    {
      header: "Alarm",
      accessor: "alarm",
      cellClassName: "text-black text-center",
      width: "55px",
    },

    {
      header: "Buying Cost",
      accessor: "buying_cost",
      cellRenderer: (row: Inventory) => {
        console.log(row.buying_cost); // For debugging
        return (
          <span className="text-black">{formatCurrency(row.buying_cost)}</span>
        );
      },
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "112px",
    },
    {
      header: "Selling Cost",
      accessor: "selling_cost",
      cellRenderer: (row: Inventory) => {
        console.log(row.selling_cost); // For debugging
        return (
          <span className="text-black">{formatCurrency(row.selling_cost)}</span>
        );
      },
      cellClassName:
        "text-black whitespace-nowrap overflow-hidden text-ellipsis",
      width: "111px",
    },
    {
      header: "Image",
      accessor: "image", // Add an image accessor
      cellRenderer: (row: Inventory) => {
        // Assuming the image URL or path is stored in the `image` field of the data
        return (
          <img
            src={row.image}
            alt="Item"
            className="w-12 h-12 object-cover rounded" // Styling for the image
          />
        );
      },
      cellClassName: "text-black",
      width: "80px",
    },
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
      icon1: ICONS.upArrow,
      icon2: ICONS.downArrow2,
      width: "120px",
      onIcon1Click: () => handleSort(data, "asc"),
      onIcon2Click: () => handleSort(data, "desc"),
    },
  ];

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown2(false);
    }
  };

  const handleStateSelect2 = (catagory: string) => {
    setFormData((prev) => ({
      ...prev,
      category: catagory,
    }));
    setShowDropdown2(false);
  };
   useEffect(() => {
      if (showDropdown2) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropdown2]);
  

  return (
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
        <DownloadButton data={data} />
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-6 w-[70%] h-[550px] shadow-lg overflow-y-scroll custom-scrollbar scroll-none">
            {/* heading */}
            <div className="flex justify-between pb-4 ">
              <span className="font-Inter font-[600] text-sm ">Edit</span>
              <img
                src={ICONS.close}
                alt=""
                onClick={editToggleModel}
                className=" cursor-pointer"
              />
            </div>

            {/* client information */}
            <div className="">
              <span className="font-Inter font-[600] text-sm ">
                Inventroy Information
              </span>
              <div className="w-full  pb-[22px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
              <InputField
                label="Refrence"
                required={true}
                inputBg=""
                type="text"
                placeholder="Enter company name"
                name="refrence"
                value={formData.refrence}
                onChange={handleChange}
              />

<div className="flex-2 relative" ref={dropdownRef}>
            <div className="" onClick={() => setShowDropdown2(true)}>
              <InputField
                label="Category"
                required={true}
                inputBg=""
                type="select"
                icon={ICONS.downArrow2}
                placeholder="Enter the category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            {showDropdown2 && (
              <div className="absolute bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto scroll-none w-full mt-1 z-10">
                 {Catagory.map((category) => (
        <div
          key={category} // Use category as the unique key
          className="px-4 py-2 cursor-pointer hover:bg-secondary-150 hover:text-white"
          onClick={() => handleStateSelect2(category)} // Pass category to handler
        >
          {category} {/* Display category */}
        </div>
      ))}
              </div>
            )}
          </div>
              <InputField
                label="Buying Cost"
                inputBg=""
                type="number"
                placeholder="Enter Buying Cost"
                name="buyingCost"
                value={formData.buyingCost}
                onChange={handleChange}
              />

              <InputField
                label="Qantity"
                required={true}
                inputBg=""
                type="number"
                placeholder="Enter quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
              <InputField
                label="Description"
                inputBg=""
                type="text"
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <InputField
                label="SellingCost"
                inputBg=""
                type="number"
                placeholder="Enter Selling Cost"
                name="sellingCost"
                value={formData.sellingCost}
                onChange={handleChange}
              />
              <InputField
                label="GST Number"
                inputBg=""
                type="text"
                placeholder="Enter the GST number"
                name="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
              />
              <InputField
                label="Quantity Type"
                inputBg=""
                type="text"
                placeholder="Enter Quantity Type"
                name="quantityType"
                value={formData.quantityType}
                onChange={handleChange}
              />
              <InputField
                label="Alarm"
                inputBg=""
                type="number"
                placeholder="Enter Alarm"
                name="alarm"
                value={formData.alarm}
                onChange={handleChange}
              />
            </div>
              <div className="py-4 w-full flex justify-center">
            <UploadImage
              removeImage={removeImage}
              handleImageChange={handleImageChange}
              imagePreviews={imagePreviews}
            />
          </div>

            </div>
            
            <div className=" border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed mb-[22px]"></div>
            <div className="col-span-3 flex justify-center gap-4 my-8">
              <Button
                text="Clear Form"
                type="reset"
                color="text-primary-10 bg-none"
              />
              <Button
                text="Update Client"
                type="submit"
                color="bg-primary-10 text-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryListPageTable;
