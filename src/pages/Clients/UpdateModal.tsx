import React, { useEffect, useState } from "react";
import { ICONS } from "../../assets";
import Button from "../../Components/Shared/Button/Button";
import InputField from "../../Components/Shared/InputField/InputField";
import { getClientById, updateClient } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Loader from "../../lib/loader";
import { Client, CreateClient, SingleClientResponse } from "../../types/client";

const UpdateModal = ({
  editToggleModel,
  selectedId,
}: {
  editToggleModel: () => void;
  selectedId: string;
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
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
    pincode: null,
    state: "",
    country: "",
    status: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleUpdate = async () => {
    const clientData = {
      companyName: formData.companyName,
      contactPerson: formData.contactPerson,
      GST: formData.GST,
      mobileNum: formData.mobileNum,
      landLineNum: formData.landLineNum,
      // email: formData.email,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      addressLine3: formData.addressLine3,
      city: formData.city,
      pincode: Number(formData.pincode),
      state: formData.state,
      country: formData.country,
      status: formData.status.toUpperCase(),
    };
    setIsSubmitting(true);
    try {
      const response = await updateClient(selectedId, clientData);
      console.log("Client updated successfully:", response.data);
      alert("Client updated successfully!");
      clearForm();
    } catch (error) {
      console.error("Error updating client:", error);
      alert("Failed to update client. Please try again.");
    } finally {
      setIsSubmitting(false);
      navigate(0);
    }
  };

  useEffect(() => {
    const fetchClient = async () => {
      setLoading(true);
      try {
        const data: SingleClientResponse = await getClientById(selectedId);
        console.log("Client data:", data);
        setFormData({
          companyName: data.data.companyName || "",
          contactPerson: data.data.contactPerson || "",
          GST: data.data.GST || "",
          mobileNum: data.data.mobileNum || "",
          landLineNum: data.data.landLineNum || "",
          email: data.data.email || "",
          addressLine1: data.data.addressLine1 || "",
          addressLine2: data.data.addressLine2 || "",
          addressLine3: data.data.addressLine3 || "",
          city: data.data.city || "",
          pincode: data.data.pincode || 0,
          state: data.data.state || "",
          country: data.data.country || "",
          status: data.data.status || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [selectedId]);

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
      pincode: 0,
      state: "",
      country: "",
      status: "",
    });
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
              {/* heading */}
              <div className="flex justify-between pb-4 ">
                <span className="font-Inter font-[600] text-sm ">Edit</span>
                <img
                  src={ICONS.close}
                  alt=""
                  onClick={editToggleModel}
                  className=" cursor-pointer"
                />
              </div>

              {/* client information */}
              <div className="">
                <span className="font-Inter font-[600] text-sm ">
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
                    type="number"
                    placeholder="Enter the GST number"
                    name="GST"
                    value={formData.GST}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* line */}
              <div className=" border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed my-[22px]"></div>
              {/* contact information */}
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
                    name="mobileNum"
                    value={formData.mobileNum}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Landline Number"
                    inputBg=""
                    type="text"
                    placeholder="Enter Landline number"
                    name="landLineNum"
                    value={formData.landLineNum}
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
                    placeholder="Enter country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[22px]">
                <h2 className="text-[14px] font-semibold">Status</h2>
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status.toLowerCase() === "active"}
                      onChange={handleChange}
                    />
                    <span>Active</span>
                  </label>
                  <label className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status.toLowerCase() === "inactive"}
                      onChange={handleChange}
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>
              {/* Edit form fields here */}
              <div className="col-span-3 flex justify-center gap-4 my-8">
                <Button
                  text="Clear Form"
                  type="reset"
                  color="text-primary-10 bg-none"
                  onClick={clearForm}
                />
                <Button
                  text={isSubmitting ? `Updating...` : `Update Client`}
                  type="submit"
                  color="bg-primary-10 text-white"
                  onClick={handleUpdate}
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
