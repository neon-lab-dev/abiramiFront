/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect } from "react";
import InputField from "../../Components/Shared/InputField/InputField";
import Button from "../../Components/Shared/Button/Button";
import UploadImage from "./UploadImage";
import { ICONS } from "../../assets";
import { createInventories, getCategories } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Category, InventoryListResponse } from "../../types/inventory";

const CreateInventory = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [imageFiles, setImageFiles] = useState<File | object>({});
  const [imagePreviews, setImagePreviews] = useState<string | "">("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
    address3: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
    status: "active",
    image: imageFiles,
    WarehouseLocation: "",
  });
  const [categories, setCategories] = useState<Category[]>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      refrence: formData.refrence,
      catgoryId: formData.categoryId,
      description: formData.description,
      buyingCost: Number(formData.buyingCost),
      quantity: formData.quantity,
      quantityType: formData.quantityType,
      alarm: Number(formData.alarm),
      sellingCost: Number(formData.sellingCost),
      file: imageFiles,
      warehouseLocation: formData.WarehouseLocation,
    };
    console.log(data);
    setIsSubmitting(true);
    try {
      const response = await createInventories(data);
      console.log("Inventory created successfully:", response.data);
      alert("Inventory created successfully");
    } catch (error) {
      console.error("Error creating inventory:", error);
      alert("Failed to create inventory. Please try again.");
    } finally {
      setIsSubmitting(false);
      navigate("/inventory");
    }
  };

  // remove selected image
  const removeImage = () => {
    setImageFiles({});
    setImagePreviews("");
  };

  // upload image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // setImageFiles((prev) => [...prev, file]);
      setImageFiles(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        // setImagePreviews((prev) => [...prev, reader.result as string]);
        setImagePreviews(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown2(false);
    }
  };

  const handleStateSelect2 = (category: string, categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      category: category,
      categoryId: categoryId,
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

  useEffect(() => {
    console.log(imageFiles);
    setFormData({ ...formData, image: imageFiles });
  }, [imageFiles]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data: InventoryListResponse = await getCategories();
        console.log(data);
        setCategories(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div className="max-h-[calc(100vh-90px)] overflow-y-auto scroll-none">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]">
          {/* Inventory Information */}
          <div className="flex flex-col gap-[22px]">
            <h2 className="text-xl font-semibold">Inventory Information</h2>

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
                    {categories?.map((category) => (
                      <div
                        key={category.id} // Use category as the unique key
                        className="px-4 py-2 cursor-pointer hover:bg-secondary-150 hover:text-white"
                        onClick={() =>
                          handleStateSelect2(category.name, category.id)
                        } // Pass category to handler
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
                {/* <div className=" absolute bottom-[-50%] right-[6%] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 group-hover:scale-[1] scale-[0.7] before:w-[20px] before:h-[20px] before:bg-[#8d8d8d] before:z-[-1] before:absolute before:top-[-35%] before:left-[1%] before:rotate-[40deg] before:rounded-b-3xl">
                  <span className=" text-[0.9rem] bg-[#8d8d8d] text-secondary rounded px-3 py-2 ">
                    This filed accepts alphanumeric input.
                  </span>
                </div> */}
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
          </div>
          <div className="py-4 w-full flex justify-center">
            <UploadImage
              removeImage={removeImage}
              handleImageChange={handleImageChange}
              imagePreviews={imagePreviews}
            />
          </div>

          {/* Buttons */}
          <div className="col-span-3 flex justify-end gap-4 my-8">
            <Button
              text="Clear Form"
              type="reset"
              color="text-primary-10 bg-none"
            />
            <Button
              text={isSubmitting ? "Submitting..." : "Submit Form"}
              type="submit"
              // onClick={handleSubmit}
              color="bg-primary-10 text-white"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateInventory;
