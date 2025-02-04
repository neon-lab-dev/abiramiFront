import { useState } from "react";
import InputField from "../../Components/Shared/InputField/InputField";
import Button from "../../Components/Shared/Button/Button";
import { PurchaseFormData, PurchaseResponse } from "../../types/purchase";
import { createPurchase } from "../../api/api";
import { useNavigate } from "react-router-dom";

const CreatePurchase = () => {
  // const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PurchaseFormData>({
    companyName: "",
    invoiceNumber: null,
    date: "",
    totalPurchaseAmt: null,
    gstNum: null,
    status: "ACTIVE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "invoiceNumber" ||
        name === "totalPurchaseAmt" ||
        name === "gstNum"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log(formData);
      const response: PurchaseResponse = await createPurchase(formData);
      if (response.statusText === "Created") {
        alert("Purchase created successfully");
        navigate("/purchase");
      }
    } catch (error) {
      console.error("Create purchase error:", error);
      alert("Failed to create purchase");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({
      companyName: "",
      invoiceNumber: null,
      date: "",
      totalPurchaseAmt: null,
      gstNum: null,
      status: "ACTIVE",
    });
  };

  return (
    <>
      <div className="max-h-[calc(100vh-90px)] overflow-y-auto scroll-none">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]">
          {/* Purchase Information */}
          <div className="flex flex-col gap-[22px]">
            <h2 className="text-xl font-semibold">Purchase Information</h2>

            <div className="w-full pb-[22px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
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
                label="Invoice Number"
                inputBg=""
                type="number"
                placeholder="Enter the invoice number"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
              />
              <InputField
                label="Date"
                inputBg=""
                type="date"
                placeholder="Enter date of purchase"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

              <InputField
                label="Total Purchase Amount"
                required={true}
                inputBg=""
                type="number"
                placeholder="Enter total purchase amount"
                name="totalPurchaseAmt"
                value={formData.totalPurchaseAmt}
                onChange={handleChange}
              />
              <InputField
                label="GST Number"
                inputBg=""
                type="number"
                placeholder="Enter the GST number"
                name="gstNum"
                value={formData.gstNum}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-3 flex justify-end gap-4 my-8">
            <Button
              text="Clear Form"
              onClick={clearForm}
              type="reset"
              color="text-primary-10 bg-none"
            />
            <Button
              text={isSubmitting ? "Creating..." : "Submit Form"}
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
