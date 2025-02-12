import React, { useEffect, useState } from "react";
import { getSupplierById, updateSupplier } from "../../api/api";
import Button from "../../Components/Shared/Button/Button";
import InputField from "../../Components/Shared/InputField/InputField";
import { ICONS } from "../../assets";
import Loader from "../../lib/loader";
import {
  Supplier,
  SupplierByIdResponse,
  SupplierRequest,
} from "../../types/supplier";
import { useNavigate } from "react-router-dom";
import { validateEmail, validateGST, validatePhoneNumber, validatePincode, validateTelephone } from "../../utils/validation";

const UpdateModal = ({
  editToggleModel,
  selectedId,
}: {
  editToggleModel?: (id?: string) => void;
  selectedId: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supplier, setSupplier] = useState<Supplier>();
  const [loading, setLoading] = useState(false);
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
      pincode: null as number | null,
      state: "",
      country: "",
      status: "ACTIVE",
    });
  };

  useEffect(() => {
    const fetchSupplierById = async () => {
      setLoading(true);
      try {
        const response: SupplierByIdResponse = await getSupplierById(
          selectedId
        );
        setSupplier(response.data);
      } catch (error) {
        console.error("Error fetching supplier by id:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSupplierById();
  }, [selectedId]);

  useEffect(() => {
    if (supplier) {
      setFormData({
        companyName: supplier.companyName,
        title: supplier.title,
        GST: supplier.GST,
        mobileNum: supplier.mobileNum,
        landLineNum: supplier.landLineNum,
        email: supplier.email,
        addressLine1: supplier.addressLine1,
        addressLine2: supplier.addressLine2,
        addressLine3: supplier.addressLine3,
        city: supplier.city,
        pincode: supplier.pincode,
        state: supplier.state,
        country: supplier.country,
        status: supplier.status,
      });
    }
  }, [supplier]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      ...formData,
    };
    setIsSubmitting(true);
    setLoading(true);
    try {
      await updateSupplier(selectedId, data);
      alert("Supplier updated successfully!");
    } catch (error) {
      console.error("Error updating supplier:", error);
      alert("Failed to update supplier. Please try again.");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
      navigate(0);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div className="bg-white rounded-3xl p-6 w-[70%] h-[550px] shadow-lg overflow-y-scroll custom-scrollbar scroll-none">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className=" overflow-y-auto scroll-none">
                <form onSubmit={handleSubmit} className="">
                  {/* Supplier Information */}
                  <div className="flex justify-between pb-4 ">
                    <span className="font-Inter font-[600] text-sm ">
                      Edit Supplier
                    </span>
                    <img
                      src={ICONS.close}
                      alt=""
                      onClick={() => editToggleModel && editToggleModel()}
                      className=" cursor-pointer"
                    />
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
                      name="GST"
                      value={formData.GST}
                      onChange={handleChange}
                      validate={validateGST}
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="mt-5">
                    <h2 className="text-xl font-semibold">
                      Contact Information
                    </h2>
                  </div>

                  <div className="w-full py-5 border-b-2 border-dashed grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InputField
                      label="Mobile Number"
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
                    <h2 className="text-xl font-semibold">
                      Address Information
                    </h2>
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
                      type="text"
                      placeholder="Enter pincode"
                      name="pincode"
                      value={formData.pincode?.toString() || ""}
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
                          checked={
                            formData.status.trim().toUpperCase() === "ACTIVE"
                          }
                          onChange={handleChange}
                        />
                        <span className="ml-2">Active</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="inactive"
                          checked={
                            formData.status.trim().toUpperCase() === "INACTIVE"
                          }
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
                      text={isSubmitting ? "Updating..." : "Submit Form"}
                      type="submit"
                      color="bg-primary-10 text-white"
                    />
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
