import React, { useEffect, useState } from "react";
import { createSupplier, getSupplierById, updateSupplier } from "../../api/api";
import Button from "../../Components/Shared/Button/Button";
import InputField from "../../Components/Shared/InputField/InputField";
import { ICONS } from "../../assets";
import Loader from "../../lib/loader";
import { Supplier, SupplierByIdResponse } from "../../types/supplier";
import { useNavigate } from "react-router-dom";

const UpdateModal = ({
  editToggleModel,
  selectedId,
}: {
  editToggleModel: () => void;
  selectedId: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supplier, setSupplier] = useState<Supplier>();
  const [loading, setLoading] = useState(false);
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
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearForm = () => {
    setFormData({
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
        gstNumber: supplier.GST,
        mobileNumber: supplier.mobileNum,
        landlineNumber: supplier.landLineNum,
        email: supplier.email,
        address1: supplier.addressLine1,
        address2: supplier.addressLine2,
        address3: supplier.addressLine3,
        city: supplier.city,
        pinCode: supplier.pincode.toString(),
        state: supplier.state,
        country: supplier.country,
        status: supplier.status,
      });
    }
  }, [supplier]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const data = {
      companyName: formData.companyName,
      title: formData.title,
      GST: formData.gstNumber,
      mobileNum: formData.mobileNumber,
      landLineNum: formData.landlineNumber,
      email: formData.email,
      addressLine1: formData.address1,
      addressLine2: formData.address2,
      addressLine3: formData.address3,
      city: formData.city,
      pincode: parseInt(formData.pinCode),
      state: formData.state,
      country: formData.country,
      status: formData.status,
    };
    setIsSubmitting(true);
    try {
      const response = await updateSupplier(selectedId, data);
      console.log("Supplier updated successfully:", response.data);
      alert("Supplier updated successfully!");
    } catch (error) {
      console.error("Error updating supplier:", error);
      alert("Failed to update supplier. Please try again.");
    } finally {
      setIsSubmitting(false);
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
                      onClick={editToggleModel}
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
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
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
