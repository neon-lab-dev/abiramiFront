/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useRef, useState } from "react";
import { ICONS } from "../../assets";
import Button from "../../Components/Shared/Button/Button";
import InputField from "../../Components/Shared/InputField/InputField";
import UploadImage from "./UploadImage";
import {
  getCategories,
  getInventoryById,
  updateInventories,
  updateInventoryLogs,
} from "../../api/api";
import { Category, CategoryResponse } from "../../types/category";
import { InventoryItem, InventoryResponse } from "../../types/inventory";
import Loader from "../../lib/loader";

const UpdateModel = ({
  editToggleModel,
  selectedId,
}: {
  editToggleModel: () => void;
  selectedId: string;
}) => {
  const [imageFiles, setImageFiles] = useState<File | {}>({});
  const [imagePreviews, setImagePreviews] = useState<string | "">("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [inventory, setInventory] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    refrence: "",
    category: "",
    categoryId: "",
    description: "",
    buyingCost: "",
    quantity: "",
    quantityType: "",
    alarm: "",
    sellingCost: "",
    WarehouseLocation: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
    status: "active",
    image: imageFiles,
    TRType: "",
    transactionUnits: "",
    comment: "",
  });
  const handleStateSelect2 = (catagory: string, categoryId: string) => {
    setFormData((prev:any) => ({
      ...prev,
      category: catagory,
      categoryId: categoryId,
    }));
    setShowDropdown2(false);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown2(false);
    }
  };

  useEffect(() => {
    if (showDropdown2) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown2]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData:any) => ({
      ...prevData,
      [name]: name === "transactionUnits" ? Number(value) : value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      //   setImageFiles((prev) => [...prev, file]);
      setImageFiles(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        // setImagePreviews((prev) => [...prev, reader.result as string]);
        setImagePreviews(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = () => {
    setImagePreviews("");
  };

  useEffect(() => {
    setFormData({ ...formData, image: imageFiles });
  }, [imageFiles]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        //Fetch Categories
        const categoryData: CategoryResponse = await getCategories();
        setCategories(categoryData?.data);

        // Fetch Inventory
        const inventoryData: InventoryResponse = await getInventoryById(
          selectedId
        );
        setInventory(inventoryData?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedId]);

  useEffect(() => {
    const categoryName = categories.find(
      (category:any) => category.id === inventory?.catgoryId
    )?.name;
    setFormData((prevData:any) => ({
      ...prevData,
      category: categoryName || "",
      categoryId: inventory?.catgoryId || "",
    }));
    console.log(inventory);
    setImagePreviews(inventory?.image?.url || "");
  }, [inventory, categories]);

  useEffect(() => {
    setFormData((prevData:any) => ({
      ...prevData,
      refrence: inventory?.refrence || "",
      buyingCost: inventory?.buyingCost?.toString() || "",
      quantity: inventory?.quantity?.toString() || "",
      description: inventory?.description || "",
      sellingCost: inventory?.sellingCost?.toString() || "",
      WarehouseLocation: inventory?.warehouseLocation || "",
      quantityType: inventory?.quantityType || "",
      alarm: inventory?.alarm?.toString() || "0",
    }));
  }, [inventory]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const updatedData = {
      refrence: formData.refrence,
      buyingCost: formData.buyingCost,
      quantity: Number(formData.quantity),
      description: formData.description,
      sellingCost: Number(formData.sellingCost),
      warehouseLocation: formData.WarehouseLocation,
      quantityType: formData.quantityType,
      alarm: Number(formData.alarm),
      catgoryId: formData.categoryId,
      file: imageFiles ? imageFiles : undefined,
      image: !imageFiles ? inventory?.image : undefined,
      TRType: formData.TRType || "",
      transactionUnits: formData.transactionUnits || "",
      comment: formData.comment || "",
    };
    try {
      console.log("Updated Data:", updatedData);
      const response = await updateInventories(selectedId, updatedData);
      console.log("Inventory Updated:", response);
      alert("Inventory Updated Successfully");
      editToggleModel();
      window.location.reload();
    } catch (err) {
      console.error("Inventory Update Error:", err);
      alert("Inventory Update Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearInventoryForm = () => {
    setFormData((prevData) => ({
      ...prevData,
      refrence: "",
      buyingCost: "",
      quantity: "",
      description: "",
      sellingCost: "",
      WarehouseLocation: "",
      quantityType: "",
      alarm: "",
      image: "",
      category: "",
      categoryId: "",
    }));
    setImagePreviews("");
  };
  const [LogformData, setLogFormData] = useState({
    TRType: "buy",
    transactionUnits: "",
    comment: "",
  });
  const handleLogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdateLogs = async () => {
    if (!selectedId) {
      console.error("Inventory ID is missing!");
      return;
    }
    setIsSubmitting(true);
    setLoading(true);
    const updatedData = {
      txnType: formData.TRType.toUpperCase() || "",
      txnUnits: formData.transactionUnits || null,
      comments: formData.comment || "",
    };

    try {
      const response = await updateInventoryLogs(selectedId, updatedData);
      console.log("Logs updated successfully:", response);
      alert("Logs updated successfully!");
      editToggleModel();
      window.location.reload();
    } catch (error) {
      console.error("Failed to update logs:", error);
      alert("Failed to update logs!");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-6 w-[70%] h-[550px] shadow-lg overflow-y-scroll custom-scrollbar scroll-none">
     {
      loading ? <div className="size-10 mx-auto flex items-center justify-center h-screen"><Loader/> </div>
      :
      <>
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
            Inventory Information
          </span>
          <div className="w-full pb-[22px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
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
                  {categories.map((category) => (
                    <div
                      key={category.id} // Use category as the unique key
                      className="px-4 py-2 cursor-pointer hover:bg-secondary-150 hover:text-white"
                      onClick={() =>
                        handleStateSelect2(category.name, category.id)
                      }
                    >
                      {category.name} {/* Display category */}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className=" relative group">
              <InputField
                label="Buying Cost"
                inputBg=""
                type="text"
                placeholder="Enter Buying Cost"
                name="buyingCost"
                value={formData.buyingCost}
                onChange={handleChange}
              />
            </div>

            <InputField
              label="Quantity"
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
              label="Warehouse Location"
              inputBg=""
              type="text"
              placeholder="Enter the Warehouse Location"
              name="WarehouseLocation"
              value={formData.WarehouseLocation}
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
            onClick={clearInventoryForm}
            type="reset"
            color="text-primary-10 bg-none"
          />
          <Button
            text={isSubmitting ? "Updating..." : "Update Inventory"}
            type="submit"
            onClick={handleSubmit}
            color="bg-primary-10 text-white"
            disabled={isSubmitting}
          />
        </div>

        {/* heading */}
        <div>
          <span className="font-Inter font-[600] text-sm">
            Inventory Logs
          </span>
          <div className="w-full pb-[22px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            <div className="w-full flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="TRType"
                  value="sell"
                  checked={formData.TRType === "sell"}
                  onChange={handleChange}
                  className="form-radio text-primary-10"
                />
                <span className="ml-2">Sell</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="TRType"
                  value="buy"
                  checked={formData.TRType === "buy"}
                  onChange={handleChange}
                  className="form-radio text-primary-10"
                />
                <span className="ml-2">Buy</span>
              </label>
            </div>

            <InputField
              label="Transaction Units"
              required={true}
              inputBg=""
              type="number"
              placeholder="Enter Transaction Units"
              name="transactionUnits"
              value={formData.transactionUnits}
              onChange={handleChange}
            />
            <InputField
              label="Comment"
              required={false}
              inputBg=""
              type="text"
              placeholder="Enter comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
            />
          </div>

          <div className="border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed mb-[22px]"></div>

          <div className="col-span-3 flex justify-center gap-4 my-8">
            <Button
              text="Clear Form"
              type="reset"
              color="text-primary-10 bg-none"
            />
            <Button
              text="Update Logs"
              type="button"
              color="bg-primary-10 text-white"
              onClick={handleUpdateLogs}
            />
          </div>
        </div>

        <div></div>
      </>
     }
      </div>
    </div>
  );
};

export default UpdateModel;
