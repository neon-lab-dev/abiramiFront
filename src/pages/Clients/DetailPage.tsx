import React, { useEffect, useState } from "react";
import Button from "../../Components/Shared/Button/Button";
import { ICONS } from "../../assets";
import StatusCard from "../../Components/Shared/StatusCard/StatusCard";
import DashboardTable from "../../Components/Dashboard/DashboardTable";
import InputField from "../../Components/Shared/InputField/InputField";
import { useParams } from "react-router-dom";
import { deleteClient, getClientById } from "../../api/api";

const DetailPage = () => {
  const { id } = useParams();
  const [client, setClient] = useState();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const editToggleModel = () => {
    setEditModalOpen(!isEditModalOpen);
  };

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data: any[] = await getClientById(id);
        setClient(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClient();
  }, []);
  console.log(client);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await deleteClient(id);
      console.log("Item deleted!");
    } else {
      console.log("Delete action canceled.");
    }
  };

  return (
    <React.Fragment>
      <div>
        <span className="font-Inter text-sm font-semibold ml-2 ">
          Clients Detail Page
        </span>
        <div className="flex justify-end mt-[22px] mb-4 gap-[22px]">
          <Button
            text="Edit"
            imgSrc={ICONS.clientediticon}
            color="bg-secondary-155 text-[14px] text-black"
            iconClassName=" "
            onClick={editToggleModel}
          />
          <Button
            text="Delete"
            imgSrc={ICONS.clientdeleteicon}
            color="bg-primary-30 text-[14px] text-white"
            iconClassName=" "
            onClick={handleDelete}
          />
        </div>

        <div className="flex gap-7 max-md:flex-col">
          <div className="p-6 w-[471px] h-fit bg-secondary-160 rounded-[16px] flex gap-3 max-md:flex-col">
            <div className="w-[52px] h-[52px] bg-blue-100 rounded-[38px] flex justify-center items-center">
              <img
                src={ICONS.clienticon}
                alt=""
                className="w-[24px] h-[24px] rounded-full"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-inter text-[18px] font-medium leading-[36px]
              "
                >
                  Company name goes here
                </span>
                <span className="bg-secondary-165 py-1 px-3 text-primary-50 rounded-[12px] w-[67px] h-7 flex items-center justify-center">
                  active
                </span>
              </div>
              <div className="flex flex-col mt-4">
                <div className="flex gap-2">
                  <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[75px] ">
                    GST
                  </span>
                  <span className="font-inter text-[12px] font-normal leading-[18px] w-[109px] ">
                    GAAAJDU09847
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[75px]">
                    Created on
                  </span>
                  <span className="font-inter text-[12px] font-normal leading-[18px] w-[150px] ">
                    08th September, 2024
                  </span>
                </div>
              </div>
              <div className=" relative mt-7">
                <Button
                  text="Create Invoice"
                  imgSrc={ICONS.invoicescreateicon}
                  color="bg-secondary-120 text-[14px] text-secondary-125"
                  iconClassName="h-[24px] w-[24px]"
                />
                <img
                  src={ICONS.invoicesvector}
                  alt=""
                  className=" absolute top-[9.79px] left-[40px] size-1.5"
                />
              </div>
            </div>
          </div>
          {/* client detials */}
          <div className=" p-6 flex flex-col gap-4 w-full h-[232px] max-lg:h-fit bg-secondary-160 rounded-[16px]">
            <div className="flex gap-2">
              <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                Contact Person
              </span>
              <span className="font-inter text-[12px] font-normal leading-[18px] ">
                GAAAJDU09847
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                Mobile
              </span>
              <span className="font-inter text-[12px] font-normal leading-[18px]">
                +91 99998 88877
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                Location
              </span>
              <span className="font-inter text-[12px] w-fit font-normal leading-[18px]">
                {" "}
                Plot No. 21, KIADB Industrial Area, Phase 2, Peenya Industrial
                Estate, Tumkur Road, Bangalore - 560058, Karnataka, India
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                Total Income
              </span>
              <span className="font-inter text-[12px] font-normal leading-[18px] ">
                ₹ 90,87,560.98
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                Total Invoices
              </span>
              <span className="font-inter text-[12px] font-normal leading-[18px] ">
                50
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between  my-[22px] ">
          <span className="font-Inter  text-sm font-semibold ml-2 ">
            Invoices
          </span>
        </div>
        <div className="flex gap-7 mb-[22px] w-full max-md:flex-col max-md:w-full ">
          <StatusCard
            cardBg="bg-secondary-10"
            iconBg="bg-secondary-65"
            title="Total Invoices"
            value="7265"
            cardWidth="w-[416px]"
            icon={ICONS.clienticon}
          />
          <StatusCard
            cardBg="bg-secondary-30"
            iconBg="bg-secondary-70"
            title="Paid Invoices"
            value="17265"
            cardWidth="w-[416px]"
            icon={ICONS.clienticon2}
          />
          <StatusCard
            cardBg="bg-secondary-40"
            iconBg="bg-secondary-85"
            title="Pending Invoices"
            value="5"
            cardWidth="w-[416px]"
            icon={ICONS.clienticon3}
          />
        </div>
        <DashboardTable />
      </div>
      {/* Modal Overlay */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-6 w-[70%] h-[550px] shadow-lg overflow-y-scroll custom-scrollbar scroll-none">
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
                  name="pincode"
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
              />
              <Button
                text="Update Client"
                type="submit"
                color="bg-primary-10 text-white"
              />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DetailPage;
