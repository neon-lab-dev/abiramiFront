import React, { useRef, useState } from "react";
import InputField from "../../Components/Shared/InputField/InputField";
import Button from "../../Components/Shared/Button/Button";
import { ICONS } from "../../assets";

const CreateInvoice = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    ClientName: "",
    ivoicedate: "",
    Stateandcode: "",
    taxtype: "",
    invoicetype: "",
    ChequeNumber: "",
    Chequedate: "",
    BankName: "",
    ChequeAmount: "",
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
    transport:"",
    placeOfSupply:"",
    PONo:"",
    vehicleNumber:""
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

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };

  const states = [
    { name: "Andhra Pradesh", code: "28" },
  { name: "Bihar",code: "10" },
  { name: "Delhi", code: "7"},
  { name: "Goa",  code: "30" },
  { name: "Maharashtra", code: "27" },
  { name: "Jharkhand", code: "20" },
  { name: "Uttar Pradesh",code: "9 "},
  { name: "Tamil Nadu",  code: "33" } 
  ];
  const invoice  = [
    { name:"Cash Invoice" },
    { name:"Cheque Invoice" },
    { name:"Tax Invoice" },
    { name:"Quote Invoice" },
  ];
  const handleStateSelect = (stateName: string, stateCode: string) => {
    setFormData((prev) => ({
      ...prev,
      Stateandcode: stateName,
      Code: stateCode,
    }));
    setShowDropdown(false);
  };
  const handleStateSelect2 = (Invoicetype: string) => {
    setFormData((prev) => ({
      ...prev,
      invoicetype: Invoicetype,
    }));
    setShowDropdown2(false);
  };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     dropdownRef.current &&
  //     !dropdownRef.current.contains(event.target as Node)
  //   ) {
  //     setShowDropdown(false);
  //     setShowDropdown2(false);
  //   }
  // };
  // useEffect(() => {
  //   if (showDropdown||showDropdown2 ) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [showDropdown,showDropdown2]);

  return (
    <div>
      <span className="text-sm font-Inter font-[600] ">Billing Details</span>
      <div className="w-full  pb-[44px] pt-[22px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
        <InputField
          label="Client"
          required={true}
          inputBg=""
          type="text"
          placeholder="Enter Client name"
          name="ClientName"
          value={formData.ClientName}
          onChange={handleChange}
        />

        <InputField
          label="Date"
          required={true}
          inputBg=""
          type="date"
          placeholder="dd/mm/yyyy"
          name="ivoicedate"
          value={formData.ivoicedate}
          onChange={handleChange}
        />
        <div className=" flex gap-1">
          <div className="flex-2 relative" ref={dropdownRef}>
            <div className="" onClick={() => setShowDropdown(true)}>
              <InputField
                label="State & Code"
                required={true}
                inputBg=""
                type="text"
                icon={ICONS.invoicesearch}
                placeholder="Search"
                name="Stateandcode"
                value={formData.Stateandcode}
                onChange={handleChange}
              />
            </div>
            {showDropdown && (
              <div className="absolute bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto scroll-none w-full mt-1 z-10">
                {states.map((state) => (
                  <div
                    key={state.code}
                    className="px-4 py-2 cursor-pointer hover:bg-secondary-150 hover:text-white"
                    onClick={() => handleStateSelect(state.name, state.code)}
                  >
                    {state.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-end pb-[2px] flex-1">
            <InputField
              label=""
              inputBg=""
              type="text"
              placeholder="code"
              name="Code"
              value={formData.Code}
              onChange={handleChange}
            />
          </div>
        </div>

        <InputField
          label="Status"
          required={true}
          inputBg=""
          type="text"
          placeholder="Enter Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
        <InputField
          label="Tax Type"
          required={true}
          inputBg=""
          type="text"
          placeholder="Enter Tax type"
          name="taxtype"
          value={formData.taxtype}
          onChange={handleChange}
        />

          <div className="flex-2 relative" ref={dropdownRef}>
            <div className="" onClick={() => setShowDropdown2(true)}>
              <InputField
                label="Invoice Type"
                required={true}
                inputBg=""
                type="text"
                icon={ICONS.downArrow2}
                placeholder="Search"
                name="invoicetype"
                value={formData.invoicetype}
                onChange={handleChange}
              />
            </div>
            {showDropdown2 && (
              <div className="absolute bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto scroll-none w-full mt-1 z-10">
                {invoice.map((invoice) => (
                  <div
                    key={invoice.name}
                    className="px-4 py-2 cursor-pointer hover:bg-secondary-150 hover:text-white"
                    onClick={() => handleStateSelect2( invoice.name)}
                  >
                    {invoice.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {formData.invoicetype=="Cheque Invoice" && (<>
            <InputField
          label="Bank Name"
          required={true}
          inputBg=""
          type="text"
          placeholder="Enter bank name"
          name="BankName"
          value={formData.BankName}
          onChange={handleChange}
        />
        <InputField
          label="Cheque Number"
          required={true}
          inputBg=""
          type="number"
          placeholder="Enter Cheque Number"
          name="ChequeNumber"
          value={formData.ChequeNumber}
          onChange={handleChange}
        />
        <InputField
          label="Cheque Amount"
          required={true}
          inputBg=""
          type="text"
          placeholder="Enter amount"
          name="ChequeAmount"
          value={formData.ChequeAmount}
          onChange={handleChange}
        /></>)}
        
       {formData.invoicetype=="Tax Invoice" && (<>
        <InputField
          label="Transport"
          required={true}
          inputBg=""
          type="text"
          placeholder="Enter Transport"
          name="transport"
          value={formData.transport}
          onChange={handleChange}
        />
        <InputField
          label="Place of Supply"
          required={true}
          inputBg=""
          type="text"
          placeholder="Enter Place of Supply"
          name="placeOfSupply"
          value={formData.placeOfSupply}
          onChange={handleChange}
        />
         <InputField
          label="P.O.No"
          required={true}
          inputBg=""
          type="number"
          placeholder="Enter P.O.No"
          name="PONo"
          value={formData.PONo}
          onChange={handleChange}
        />
        <InputField
          label="Vehicle Number"
          required={true}
          inputBg=""
          type="string"
          placeholder=" Enter Vehicle Number"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
        /> </>)}
       
      </div>
      <span className="text-sm font-Inter font-[600] ">Product Details</span>
      <div className="mt-[22px]">
        <Button
          text="Add Product(s)"
          imgSrc={ICONS.invoiceplus}
          color="bg-secondary-120 text-[14px] text-secondary-125"
          iconClassName="h-[24px] w-[24px]"
        />
      </div>

      {/* item description */}

      <div className="bg-secondary-60 rounded-lg shadow-lg  w-full p-6 mt-6">
        <h2 className="text-sm font-[600] mb-4">Item Description</h2>

        {/* Table - Responsive Layout */}
        <div className="overflow-x-auto">
          <table className="w-full border-hidden lg:table hidden">
            <thead>
              <tr className="text-sm font-normal leading-5 font-inter text-neutral-5 opacity-[0.6]">
                <th className=" px-4 py-2 text-left">S.No.</th>
                <th className=" px-4 py-2 text-left">Description</th>
                <th className=" px-4 py-2 text-left">HSN No.</th>
                <th className=" px-4 py-2 text-left">Quantity</th>
                <th className=" px-4 py-2 text-left">Rate</th>
                <th className=" px-4 py-2 text-left">Discount</th>
                <th className=" px-4 py-2 text-left">Amount</th>
                <th className=" px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=" px-4 py-2 text-center text-sm font-normal leading-5 font-inter text-neutral-5 opacity-[0.6]">
                  1
                </td>
                <td className=" px-4 py-2">
                  <input
                    type="text"
                    placeholder="Enter Description"
                    className="w-full p-1 border border-secondary-145 rounded"
                  />
                </td>
                <td className=" px-4 py-2">
                  <input
                    type="text"
                    placeholder="Enter HSN No."
                    className="w-full p-1  border border-secondary-145 rounded"
                  />
                </td>
                <td className=" px-4 py-2">
                  <input
                    type="text"
                    placeholder="Enter quantity"
                    className="w-full p-1 border border-secondary-145  rounded"
                  />
                </td>
                <td className=" px-4 py-2">
                  <input
                    type="text"
                    placeholder="Enter rate"
                    className="w-full p-1 border border-secondary-145 rounded"
                  />
                </td>
                <td className=" px-4 py-2">
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="w-full p-1 border border-secondary-145 rounded"
                  />
                </td>
                <td className=" px-4 py-2">
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="w-full p-1 border border-secondary-145 rounded"
                  />
                </td>
                <td className=" px-4 py-2 text-center text-red-500 cursor-pointer">
                  <Button
                    text=""
                    imgSrc={ICONS.invoicedelete}
                    color=""
                    iconClassName="h-[24px] w-[24px]"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Responsive (Mobile View) */}
          <div className="lg:hidden grid gap-4">
            <div className="flex items-center justify-between">
              <span>S. No: 1</span>
              <Button
                text=""
                imgSrc={ICONS.invoicedelete}
                color=""
                iconClassName="h-[24px] w-[24px]"
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                placeholder="Enter Description"
                className="w-full p-2 border border-secondary-145 rounded mt-1"
              />
            </div>
            <div>
              <label>HSN No.</label>
              <input
                type="text"
                placeholder="Enter HSN No."
                className="w-full p-2 border border-secondary-145 rounded mt-1"
              />
            </div>
            <div>
              <label>Quantity</label>
              <input
                type="text"
                placeholder="Enter quantity"
                className="w-full p-2 border border-secondary-145 rounded mt-1"
              />
            </div>
            <div>
              <label>Rate</label>
              <input
                type="text"
                placeholder="Enter rate"
                className="w-full p-2 border border-secondary-145 rounded mt-1"
              />
            </div>
            <div>
              <label>Discount</label>
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full p-2 border border-secondary-145 rounded mt-1"
              />
            </div>
            <div>
              <label>Amount</label>
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full p-2 border border-secondary-145 rounded mt-1"
              />
            </div>
          </div>
        </div>

        {/* Bank Details and Totals */}
        <div className="flex justify-between max-md:flex-col-reverse gap-8 mt-6">
          <div className="flex items-end justify-between gap-8 w-[66%] max-md:flex-col-reverse">
            <div className=" max-lg:gap-2">
              <h3 className="text-sm font-[600] mb-4">Bank details</h3>
              <div className="flex gap-2">
                <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                  Bank Name
                </span>
                <span className="font-inter text-[12px] font-normal leading-[18px] ">
                  State Bank of India
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                  Account Number
                </span>
                <span className="font-inter text-[12px] font-normal leading-[18px] ">
                  xxxx 98
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                  IFSC
                </span>
                <span className="font-inter text-[12px] font-normal leading-[18px] ">
                  SBIN0098763
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                  Branch{" "}
                </span>
                <span className="font-inter text-[12px] font-normal leading-[18px] ">
                  Avinashi Road, Coimbatore-37
                </span>
              </div>
            </div>

            {/* Total in Words */}
            <div className="mt-4 ">
              <h3 className="text-sm font-normal leading-5 font-inter text-neutral-5 opacity-[0.6] mb-6">
                Total (in words)
              </h3>
              <p className="text-sm leading-5 font-inter font-[600]">
                Seventy five lakhs and three thousand
              </p>
            </div>
          </div>

          <div className="w-[314px] ">
            <div className="flex justify-between items-center  py-2">
              <span className="text-neutral-5 opacity-[0.5] font-inter text-[14px] font-normal ">
                Sub Total
              </span>
              <div className="w-[111px]">
                <InputField
                  label=""
                  inputBg="bg-white w-full "
                  type="text"
                  placeholder="₹ 0"
                  name=""
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between items-center  py-2">
              <span className="text-neutral-5 opacity-[0.5] font-inter text-[14px] font-normal ">
                Discount
              </span>
              <div className="w-[111px]">
                <InputField
                  label=""
                  inputBg="bg-white w-full "
                  type="text"
                  placeholder="₹ 0"
                  name=""
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between items-center  py-2">
              <span className="text-neutral-5 opacity-[0.5] font-inter text-[14px] font-normal ">
                PF Amount
              </span>
              <div className="w-[111px]">
                <InputField
                  label=""
                  inputBg="bg-white w-full "
                  type="text"
                  placeholder="₹ 0"
                  name=""
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between items-center  py-2">
              <span className="text-neutral-5 opacity-[0.5] font-inter text-[14px] font-normal ">
                {(formData.Code=="33")?"Tax | CGST @ 9% & SGST @ 9%":" Tax | IGST @ 18%"}
              </span>
              <div className="w-[111px]">
                <InputField
                  label=""
                  inputBg="bg-white w-full "
                  type="text"
                  placeholder="₹ 0"
                  name=""
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between items-center  py-2">
              <span className="text-neutral-5 opacity-[0.5] font-inter text-[14px] font-normal ">
                Round Off
              </span>
              <div className="w-[111px]">
                <InputField
                  label=""
                  inputBg="bg-white w-full "
                  type="text"
                  placeholder="₹ 0"
                  name=""
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg mt-8">
              <span className="text-sm font-[600]">Total</span>
              <span className="text-sm font-[600]">₹ 75,03,000.00</span>
            </div>
          </div>
        </div>
      </div>

    
      <div className="flex flex-col my-[22px]">
        <span className="text-sm font-Inter font-[600]">
          Terms & Conditions
        </span>
        <span className="text-sm font-Inter font-normal mt-[22px]">Notes</span>
        <div className="flex flex-col py-1">
          <span className="text-[rgba(28,28,28,0.4)]  font-sans font-normal text-[14px] leading-[20px]">
            1.some notes goes here
          </span>
          <span className="text-[rgba(28,28,28,0.4)] font-sans font-normal text-[14px] leading-[20px]">
            2.some notes goes here
          </span>
        </div>
      </div>
      <div className=" border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed my-[22px]"></div>

      {/* Buttons */}
      <div className="col-span-3 flex justify-end gap-4 my-8">
        <Button text="Save" type="reset" color="text-primary-10 bg-none" />
        <Button
          text="Save & Print"
          type="submit"
          color="bg-primary-10 text-white"
        />
      </div>
    </div>
  );
};

export default CreateInvoice;

