import React, { useState } from "react";
import InputField from "../../Components/Shared/InputField/InputField";
import Button from "../../Components/Shared/Button/Button";

const CreateClients = () => {
  const [formData, setFormData] = useState({
    CompanyName: "",
    ContactPerson: "",
    gstnumber: "",
    MobileNumber: "",
    LandlineNumber: "",
    active: "",
    Inactive: "",
    Code: "",
    email: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <div>
        <span className="text-sm font-Inter font-[600] ">
          Client Information
        </span>
        <div className="w-full   pt-[22px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          <InputField
            label="Company Name"
            required={true}
            inputBg=""
            type="text"
            placeholder="Enter Company name"
            name="CompanyName"
            value={formData.CompanyName}
            onChange={handleChange}
          />
          <InputField
            label="Contact Person"
            inputBg=""
            type="text"
            placeholder="Enter contact person name"
            name="ContactPerson"
            value={formData.ContactPerson}
            onChange={handleChange}
          />
          <InputField
            label="GST Number"
            required={true}
            inputBg=""
            type="string"
            placeholder="Enter the GST number"
            name="gstnumber"
            value={formData.gstnumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className=" border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed my-[22px]"></div>
      <div>
        <span className="text-sm font-Inter font-[600] ">
          Contact Information
        </span>
        <div className="w-full  py-[22px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          <InputField
            label="Mobile Number"
            inputBg=""
            type="number"
            placeholder="Enter Mobile name"
            name="MobileNumber"
            value={formData.MobileNumber}
            onChange={handleChange}
          />
          <InputField
            label="Landline Number"
            inputBg=""
            type="text"
            placeholder="Enter Landline number"
            name="LandlineNumber"
            value={formData.LandlineNumber}
            onChange={handleChange}
          />
          <InputField
            label="Email ID"
            inputBg=""
            type="text"
            placeholder="Enter the Email ID"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className=" border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed mb-[22px]"></div>
      <div>
        <span className="text-sm font-Inter font-[600] ">
          Address Information
        </span>
        <div className="w-full  py-[22px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          <InputField
            label="Address line 1"
            inputBg=""
            type="text"
            placeholder="Enter Door Number or building number"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
          />
          <InputField
            label="Address line 2"
            inputBg=""
            type="text"
            placeholder="Enter apartment name or building name"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
          />
          <InputField
            label="Address line 3"
            inputBg=""
            type="text"
            placeholder="Enter locality or street"
            name="address3"
            value={formData.address3}
            onChange={handleChange}
          />
          <InputField
            label="City"
            inputBg=""
            type="text"
            placeholder="Enter city or district"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <InputField
            label="Pincode"
            inputBg=""
            type="number"
            placeholder="Enter pincode"
            name="pinCode" 
            value={formData.pinCode} 
            onChange={handleChange}
          />
          <InputField
            label="State"
            inputBg=""
            type="text"
            placeholder="Enter state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <InputField
            label="Country"
            inputBg=""
            type="text"
            placeholder="Enter country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className=" border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed mb-[22px]"></div>
      {/* Status */}
      <div className="flex flex-col gap-[22px]">
        <h2 className="text-[14px] font-semibold">Status</h2>
        <div className="flex items-center gap-5">
          <label className="flex items-center gap-4">
            <input
              type="radio"
              name="status"
              value="active"
              checked={formData.status === "active"}
              onChange={handleChange}
            />
            <span>Active</span>
          </label>
          <label className="flex items-center gap-4">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={formData.status === "inactive"}
              onChange={handleChange}
            />
            <span>Inactive</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="col-span-3 flex justify-end gap-4 my-8">
        <Button
          text="Clear Form"
          type="reset"
          color="text-primary-10 bg-none"
        />
        <Button
          text="Create Client"
          type="submit"
          color="bg-primary-10 text-white"
        />
      </div>
    </div>
  );
};

export default CreateClients;
