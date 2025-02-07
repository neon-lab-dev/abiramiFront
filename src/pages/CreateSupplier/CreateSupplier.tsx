import { useState } from "react";
import InputField from "../../Components/Shared/InputField/InputField";
import Button from "../../Components/Shared/Button/Button";
import { createSupplier } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { SupplierRequest } from "../../types/supplier";
import { validateEmail, validateGST, validatePhoneNumber, validateTelephone } from "../../utils/validation";

const CreateSupplier = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SupplierRequest>({
    companyName: "",
    title: "",
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
    status: "ACTIVE",
  });
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
    const data = {
      ...formData,
    };

    setIsSubmitting(true);
    try {
      const response = await createSupplier(data);
      console.log("Supplier created successfully:", response.data);
      alert("Supplier created successfully!");
    } catch (error: unknown) {
      type ErrorResponse = {
        response?: {
          status: number;
        };
      };
      const err = error as ErrorResponse;
      if (err.response && err.response.status === 400) {
        alert(
          "Failed to create client. Please ensure all required fields are filled."
        );
      } else {
        console.error("Error creating client:", error);
        alert("Failed to create client. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      navigate("/suppliers");
    }
  };

  const clearForm = () => {
    setFormData({
      companyName: "",
      title: "",
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
      status: "ACTIVE",
    });
  };

  return (
    <div className="max-h-[calc(100vh-90px)] overflow-y-auto scroll-none">
      <form onSubmit={handleSubmit} className="">
        {/* Supplier Information */}
        <div className="">
          <h2 className="text-xl font-semibold">Supplier Information</h2>
        </div>

        <div className="w-full py-5 border-b-2 border-dashed grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputField
            label="Company Name"
            required={true}
            inputBg=""
            type="text"
            placeholder="Enter company name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />

          <InputField
            label="Title / Item"
            required={true}
            inputBg=""
            type="text"
            placeholder="Enter the title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <InputField
            label="GST Number"
            required={true}
            inputBg=""
            type="text"
            placeholder="Enter the GST number"
            name="GST"
            value={formData.GST}
            onChange={handleChange}
            validate={validateGST}
          />
        </div>

        {/* Contact Information */}
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Contact Information</h2>
        </div>

        <div className="w-full py-5 border-b-2 border-dashed grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputField
            label="Mobile Number"
            required={true}
            inputBg=""
            type="text"
            placeholder="Enter mobile number"
            name="mobileNum"
            value={formData.mobileNum}
            onChange={handleChange}
            validate={validatePhoneNumber}
          />

          <InputField
            label="Landline Number"
            inputBg=""
            type="text"
            placeholder="Enter landline number"
            name="landLineNum"
            value={formData.landLineNum}
            onChange={handleChange}
            validate={validateTelephone}
          />

          <InputField
            label="Email ID"
            inputBg=""
            type="email"
            placeholder="Enter email ID"
            name="email"
            value={formData.email}
            onChange={handleChange}
            validate={validateEmail}
          />
        </div>

        {/* Address Information */}
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Address Information</h2>
        </div>

        <div className="w-full py-5 border-b-2 border-dashed grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            value={formData.pincode}
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
            placeholder="Enter country name"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div className="my-5">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          <div className="flex items-center gap-5">
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="ACTIVE"
                checked={formData.status.trim().toLowerCase() === "active"}
                onChange={handleChange}
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="INACTIVE"
                checked={formData.status.trim().toLowerCase() === "inactive"}
                onChange={handleChange}
              />
              <span className="ml-2">Inactive</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="col-span-3 flex justify-end gap-4  my-6">
          <Button
            text="Clear Form"
            type="reset"
            color="text-primary-10 bg-none"
            onClick={clearForm}
          />
          <Button
            text={isSubmitting ? "Submitting..." : "Submit Form"}
            type="submit"
            color="bg-primary-10 text-white"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateSupplier;
