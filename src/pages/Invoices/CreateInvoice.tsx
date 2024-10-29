import React, { useState } from 'react'
import InputField from '../../Components/Shared/InputField/InputField'
import Button from '../../Components/Shared/Button/Button';
import { ICONS } from '../../assets';

const CreateInvoice = () => {
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
    <div>
      <span className='text-sm font-Inter font-[600] '>Billing Details</span>
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
        <div className=' flex gap-1'>
          <div className='flex-2'>
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
          <div className='flex items-end pb-[2px] flex-1'>
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
        <InputField
          label="Inoice Type"
          required={true}
          inputBg=""
          type="text"
          placeholder="Enter invoice type"
          name="invoicetype"
          value={formData.invoicetype}
          onChange={handleChange}
        />
      </div>
      <span className='text-sm font-Inter font-[600] '>Product Details</span>
      <div className='mt-[22px]'>
        <Button
          text="Add Product(s)"
          imgSrc={ICONS.invoiceplus}   
          color='bg-secondary-120 text-[14px] text-secondary-125'
          iconClassName="h-[24px] w-[24px]"
        />
      </div>
      <div className=' border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed my-[22px]'>
      </div>
      <span className='text-sm font-Inter font-[600] '>Cheque Details</span>
      <div className="w-full  pt-[22px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
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
          label="Cheque Date"
          required={true}
          inputBg=""
          type="date"
          placeholder="dd/mm/yyyy"
          name="Chequedate"
          value={formData.Chequedate}
          onChange={handleChange}
        />
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
          label="Cheque Amount"
          required={true}
          inputBg=""
          type="text"
          placeholder="Enter amount"
          name="ChequeAmount"
          value={formData.ChequeAmount}
          onChange={handleChange}
        />
      </div>
      <div className=' border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed my-[22px]'>
      </div>
      <div className='flex flex-col'>
        <span className='text-sm font-Inter font-[600]'>Terms & Conditions</span>
        <span className='text-sm font-Inter font-normal mt-[22px]'>Notes</span>
        <div className='flex flex-col py-1'>
          <span className='text-[rgba(28,28,28,0.4)]  font-sans font-normal text-[14px] leading-[20px]'>1.some notes goes here</span>
          <span className='text-[rgba(28,28,28,0.4)] font-sans font-normal text-[14px] leading-[20px]'>2.some notes goes here</span>
        </div>
      </div>
      <div className=' border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed my-[22px]'>
      </div>

      {/* Buttons */}
      <div className="col-span-3 flex justify-end gap-4 my-8">
        <Button
          text="Save"
          type="reset"
          color="text-primary-10 bg-none"
        />
        <Button
          text="Save & Print"
          type="submit"
          color="bg-primary-10 text-white"
        />
      </div>

    </div>
  )
}

export default CreateInvoice