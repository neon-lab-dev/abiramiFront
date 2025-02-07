import React, { useState } from "react";
import InputField from "../../Components/Shared/InputField/InputField";
import Button from "../../Components/Shared/Button/Button";
import { createClient } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { CreateClient } from "../../types/client";
import { validateEmail, validateGST, validatePhoneNumber, validatePincode, validateTelephone } from "../../utils/validation";

const CreateClients = () => {
  const [formData, setFormData] = useState<CreateClient>({
    companyName: "",
    contactPerson: "",
    GST: "",
    mobileNum: "",
    landLineNum: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    pincode: null as number | null,
    state: "",
    country: "",
    status: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "pincode" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clientData = {
      ...formData,
    };
    console.log(clientData);
    setIsSubmitting(true);
    try {
      const response = await createClient(clientData);
      console.log("Client created successfully:", response.data);
      alert("Client created successfully!");
      clearForm();
      navigate("/clients");
        } catch (error: unknown) {
      type ErrorResponse = {
        response?: {
          status: number;
        };
      };
      const err = error as ErrorResponse;
      if (err.response?.status === 400) {
        alert(
          "Failed to create client. Please ensure all required fields are filled."
        );
      } else {
        console.error("Error creating client:", error);
        alert("Failed to create client. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({
      companyName: "",
      contactPerson: "",
      GST: "",
      mobileNum: "",
      landLineNum: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      pincode: null,
      state: "",
      country: "",
      status: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          <InputField
            label="Contact Person"
            inputBg=""
            type="text"
            placeholder="Enter contact person name"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
          />
          <InputField
            label="GST Number"
            required={true}
            inputBg=""
            type="string"
            placeholder="Enter the GST number"
            name="GST"
            value={formData.GST}
            onChange={handleChange}
            validate={validateGST}
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
            required={true}
            inputBg=""
            type="number"
            placeholder="Enter Mobile number"
            name="mobileNum"
            value={formData.mobileNum}
            onChange={handleChange}
            validate={validatePhoneNumber}
          />
          <InputField
            label="Landline Number"
            inputBg=""
            type="text"
            placeholder="Enter Landline number"
            name="landLineNum"
            value={formData.landLineNum}
            onChange={handleChange}
            validate={validateTelephone}
          />
          <InputField
            label="Email ID"
            inputBg=""
            type="text"
            placeholder="Enter the Email ID"
            name="email"
            value={formData.email}
            onChange={handleChange}
            validate={validateEmail}
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
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
          />
          <InputField
            label="Address line 2"
            inputBg=""
            type="text"
            placeholder="Enter apartment name or building name"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
          />
          <InputField
            label="Address line 3"
            inputBg=""
            type="text"
            placeholder="Enter locality or street"
            name="addressLine3"
            value={formData.addressLine3}
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
            name="pincode"
            value={formData.pincode || null}
            onChange={handleChange}
            validate={validatePincode}
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
              value="ACTIVE"
              checked={formData.status.trim().toLowerCase() === "active"}
              onChange={handleChange}
            />
            <span>Active</span>
          </label>
          <label className="flex items-center gap-4">
            <input
              type="radio"
              name="status"
              value="INACTIVE"
              checked={formData.status.trim().toLowerCase() === "inactive"}
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
          onClick={clearForm}
        />
        <Button
          text={isSubmitting ? "Submitting..." : "Create Client"}
          disabled={isSubmitting}
          type="submit"
          color="bg-primary-10 text-white"
        />
      </div>
    </form>
  );
};

export default CreateClients;
