import { useState } from "react";
import InputField from "../../Components/Shared/InputField/InputField";
import Button from "../../Components/Shared/Button/Button";

const CreateSupplier = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    gstNumber: "",
    mobileNumber: "",
    landlineNumber: "",
    email: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
    status: "active",
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
            inputBg=""
            type="text"
            placeholder="Enter the title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <InputField
            label="GST Number"
            inputBg=""
            type="text"
            placeholder="Enter the GST number"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
          />
        </div>

        {/* Contact Information */}
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Contact Information</h2>
        </div>

        <div className="w-full py-5 border-b-2 border-dashed grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputField
            label="Mobile Number"
            inputBg=""
            type="text"
            placeholder="Enter mobile number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />

          <InputField
            label="Landline Number"
            inputBg=""
            type="text"
            placeholder="Enter landline number"
            name="landlineNumber"
            value={formData.landlineNumber}
            onChange={handleChange}
          />

          <InputField
            label="Email ID"
            inputBg=""
            type="email"
            placeholder="Enter email ID"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            label="pinCode"
            inputBg=""
            type="text"
            placeholder="Enter pinCode"
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
                value="active"
                checked={formData.status === "active"}
                onChange={handleChange}
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={formData.status === "inactive"}
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
          />
          <Button
            text="Submit Form"
            type="submit"
            color="bg-primary-10 text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateSupplier;