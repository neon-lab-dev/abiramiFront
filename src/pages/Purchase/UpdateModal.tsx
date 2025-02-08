import React, { useEffect, useState } from "react";
import Button from "../../Components/Shared/Button/Button";
import InputField from "../../Components/Shared/InputField/InputField";
import { PurchaseFormData, SinglePurchaseResponse } from "../../types/purchase";
import { ICONS } from "../../assets";
import Loader from "../../lib/loader";
import { getPurchaseById, updatePurchase } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { validateGST } from "../../utils/validation";
import { number } from "zod";

const UpdateModal = ({
  editToggleModel,
  selectedId,
}: {
  editToggleModel: () => void;
  selectedId: string;
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PurchaseFormData>({
    companyName: "",
    invoiceNumber: 0,
    date: "",
    totalPurchaseAmt: 0,
    gstNum: "",
    status: "ACTIVE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "invoiceNumber" || name === "totalPurchaseAmt"
          ? Number(value)
          : value, // Leave `gstNum` as string
    }));
  };
  

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log(formData);
      const response = await updatePurchase(selectedId, formData);
      console.log("Purchase updated successfully:", response);
      if (response.statusText === "OK") {
        alert("Purchase updated successfully!");
        navigate(0);
      }
      alert("Purchase updated successfully!");
    } catch (error) {
      console.error("Error updating purchase:", error);
      alert("Failed to update purchase. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchPurchase = async () => {
      setLoading(true);
      try {
        const response: SinglePurchaseResponse = await getPurchaseById(
          selectedId
        );
        setFormData({ ...response.data });
      } catch (error) {
        console.error("Get purchase error:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchPurchase();
  }, [selectedId]);
  console.log(formData.gstNum)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-8 lg:p-12 w-[70%] h-[550px] shadow-lg overflow-y-scroll custom-scrollbar scroll-none">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="h-full flex flex-col justify-between gap-[22px]">
            {/* Purchase Information */}
            <div className="flex flex-col gap-[22px]">
              <div className="flex justify-between pb-4 ">
                <span className="text-sm font-Inter font-[600] ">
                  Purchase Information
                </span>
                <img
                  src={ICONS.close}
                  alt=""
                  onClick={editToggleModel}
                  className=" cursor-pointer"
                />
              </div>
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
                type="text"
                placeholder="Enter the GST number"
                name="gstNum"
                value={formData.gstNum}
                onChange={handleChange}
                validate={validateGST}
              />
              </div>
            </div>

            {/* Buttons */}
            <div className="col-span-3 flex justify-end gap-4 ">
              <Button
                text="Clear Form"
                type="reset"
                color="text-primary-10 bg-none"
              />
              <Button
                text={isSubmitting ? "Updating..." : "Submit Form"}
                type="submit"
                onClick={handleSubmit}
                color="bg-primary-10 text-white"
                disabled={isSubmitting}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateModal;
