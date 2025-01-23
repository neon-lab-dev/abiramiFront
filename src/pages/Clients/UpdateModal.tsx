import React, { useEffect, useState } from "react";
import { ICONS } from "../../assets";
import Button from "../../Components/Shared/Button/Button";
import InputField from "../../Components/Shared/InputField/InputField";
import { getClientById, updateClient } from "../../api/api";
import { useNavigate } from "react-router-dom";
import Loader from "../../lib/loader";

const UpdateModal = ({ editToggleModel, selectedId }) => {
  const navigate = useNavigate();
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      companyName: formData.CompanyName,
      contactPerson: formData.ContactPerson,
      GST: formData.gstnumber,
      mobileNum: formData.MobileNumber,
      landLineNum: formData.LandlineNumber,
      // email: formData.email,
      addressLine1: formData.address1,
      addressLine2: formData.address2,
      addressLine3: formData.address3,
      city: formData.city,
      pincode: parseInt(formData.pinCode),
      state: formData.state,
      country: formData.country,
      status: formData.status.toUpperCase(),
    };
    setIsSubmitting(true);
    try {
      const response = await updateClient(selectedId, clientData);
      console.log("Client updated successfully:", response.data);
      alert("Client updated successfully!");
      setFormData({
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
        const data: any[] = await getClientById(selectedId);
        setClient(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [selectedId]);

  useEffect(() => {
    setFormData({
      CompanyName: client.companyName,
      ContactPerson: client.contactPerson,
      gstnumber: client.GST,
      MobileNumber: client.mobileNum,
      LandlineNumber: client.landLineNum,
      active: "",
      Inactive: "",
      Code: "",
      email: client.email,
      address1: client.addressLine1,
      address2: client.addressLine2,
      address3: client.addressLine3,
      city: client.city,
      pinCode: client.pincode,
      state: client.state,
      country: client.country,
      status: client.status,
    });
  }, [client]);

  const clearForm = () => {
    setFormData({
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
                    type="number"
                    placeholder="Enter the GST number"
                    name="gstnumber"
                    value={formData.gstnumber}
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
