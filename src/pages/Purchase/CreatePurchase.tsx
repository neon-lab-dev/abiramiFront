import { useState } from "react";
import InputField from "../../Components/Shared/InputField/InputField";
import Button from "../../Components/Shared/Button/Button";

const CreatePurchase = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    invoicenumber: "",
    gstNumber: "",
    dateOfPurchase: "",
    totalPurchaseAmount: "",
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
    <>
      <div className="max-h-[calc(100vh-90px)] overflow-y-auto scroll-none">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]">
          {/* Purchase Information */}
          <div className="flex flex-col gap-[22px]">
            <h2 className="text-xl font-semibold">Purchase Information</h2>

          <div className="w-full  pb-[22px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
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
              label="Invoice Number "
              inputBg=""
              type="text"
              placeholder="Enter the invoicenumber"
              name="invoicenumber"
              value={formData.invoicenumber}
              onChange={handleChange}
            />
            <InputField
              label="Date Of Purchase"
              inputBg=""
              type="text"
              placeholder="Enter Date Of Purchase"
              name="dateOfPurchase"
              value={formData.dateOfPurchase}
              onChange={handleChange}
            />
            
            <InputField
              label="Total Purchase Amount"
              inputBg=""
              type="text"
              placeholder="Enter total Purchase Amount"
              name="totalPurchaseAmount"
              value={formData.totalPurchaseAmount}
              onChange={handleChange}
            />
            <InputField
              label="GST Number"
              required={true}
              inputBg=""
              type="text"
              placeholder="Enter the GST number"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
            />
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

export default CreatePurchase;
