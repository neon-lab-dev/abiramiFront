import { useState, useRef,useEffect } from "react";
import InputField from "../../Components/Shared/InputField/InputField";
import Button from "../../Components/Shared/Button/Button";
import UploadImage from "./UploadImage";
import { ICONS } from "../../assets";

const CreateInventory = () => {
   const dropdownRef = useRef<HTMLDivElement>(null);
    const [showDropdown2, setShowDropdown2] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [formData, setFormData] = useState({
    refrence: "",
    category: "",
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
    image:imageFiles,
    WarehouseLocation:"",
  });

  const Catagory  = [
    "C1" ,
    "C2" ,
   "C3" ,
    "C4" ,
  ];
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  // remove selected image
  const removeImage = (url: string) => {
    setImagePreviews((prev) => prev.filter((preview) => preview !== url));
  };

  // upload image
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
                type="text"
                placeholder="Enter Buying Cost"
                name="buyingCost"
                value={formData.buyingCost}
                onChange={handleChange}
              />
              

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
              text="Submit Form"
              type="submit"
              color="bg-primary-10 text-white"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateInventory;
