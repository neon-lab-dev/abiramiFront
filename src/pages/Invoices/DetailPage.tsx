import React from 'react'
import Button from '../../Components/Shared/Button/Button'
import { ICONS } from '../../assets'
import InvoiceTable from '../../Components/Invoices/InvoiceTable'

const DetailPage = () => {
  return (
    <div>
      <div className='flex justify-between mb-[22px] '>
        <span className='font-Inter text-sm font-semibold ml-2 '>Invoice list page</span>
        <div className=' relative'>
          <Button
          text="Create Invoice"
          imgSrc={ICONS.invoicescreateicon}   
          color='bg-secondary-120 text-[14px] text-secondary-125'
          iconClassName="h-[24px] w-[24px]"
          />
          <img src={ICONS.invoicesvector} alt="" className=' absolute top-[9.79px] left-[40px] size-1.5' />
        </div>
      </div>

      <div className='flex gap-7 max-md:flex-col '>
        <div className = 'bg-secondary-60 opacity-75 w-[416px] p-6 flex flex-col rounded-2xl'>
          <span className='font-sans text-xs font-normal leading-4 '>From</span>
          <span className='font-sans text-lg font-[600] leading-9 my-2 '>Abirami Enterpirses</span>
          <div className='flex gap-3 mb-2 '>
            <div>
              <img src={ICONS.invoiceslocation} alt="" className='size-4'/>
            </div>
            <div className='flex gap-0.5 flex-col '>
              <span className='font-sans text-xs font-normal leading-[15px] '>1052, Bharathpur road, PN Palayam, Coimbatore</span>
              <span className='font-sans text-xs font-normal leading-[15px] '>Address line 2</span>
              <span className='font-sans text-xs font-normal leading-[15px] '>541087</span>
              <span className='font-sans text-xs font-normal leading-[15px] '>Tamil Nadu, India</span>
            </div>
          </div>
          <div className='flex gap-3 items-center mb-[9px]'>
            <img src={ICONS.invoicescreditcard} alt="" />
            <span className='font-sans text-xs font-normal leading-[15px] '>33ACVPC901G1ZS</span>
          </div>
          <div className='flex gap-3 items-center mb-[9px]'>
            <img src={ICONS.invoicesmobile} alt="" />
            <span className='font-sans text-xs font-normal leading-[15px]  '>+91 99986 98765, 04321 987651</span>
          </div>
          <div className='flex gap-3 items-center mb-[9px]'>
            <img src={ICONS.invoicesattherate} alt="" />
            <span className='font-sans text-xs font-normal leading-[15px] '>+91 99986 98765, 04321 987651</span>
          </div>
        </div>
        <div className = 'bg-secondary-60 opacity-75 w-[416px] p-6 flex flex-col rounded-2xl'>
          <span className='font-sans text-xs font-normal leading-4 '>To</span>
          <span className='font-sans text-lg font-[600] leading-9 my-2 '>AJK Pumps</span>
          <div className='flex gap-3 mb-2 '>
            <div>
              <img src={ICONS.invoiceslocation} alt="" className='size-4'/>
            </div>
            <div className='flex gap-0.5 flex-col '>
              <span className='font-sans text-xs font-normal leading-[15px] '>1052, Bharathpur road, PN Palayam, Coimbatore</span>
              <span className='font-sans text-xs font-normal leading-[15px] '>Address line 2</span>
              <span className='font-sans text-xs font-normal leading-[15px] '>541087</span>
              <span className='font-sans text-xs font-normal leading-[15px] '>Tamil Nadu, India</span>
            </div>
          </div>
          <div className='flex gap-3 items-center mb-[9px]'>
            <img src={ICONS.invoicescreditcard} alt="" />
            <span className='font-sans text-xs font-normal leading-[15px] '>33ACVPC901G1ZS</span>
          </div>
          <div className='flex gap-3 items-center mb-[9px]'>
            <img src={ICONS.invoicesmobile} alt="" />
            <span className='font-sans text-xs font-normal leading-[15px]  '>+91 99986 98765, 04321 987651</span>
          </div>
          <div className='flex gap-3 items-center mb-[9px]'>
            <img src={ICONS.invoicesattherate} alt="" />
            <span className='font-sans text-xs font-normal leading-[15px] '>+91 99986 98765, 04321 987651</span>
          </div>
        </div>
        <div className = 'bg-secondary-60 opacity-75 w-[416px] p-6 flex flex-col rounded-2xl'>
          <span className='font-sans text-xs font-normal leading-4 '>Billing Details</span>
          <div className='flex gap-3 items-center mt-[31px]'>
            <span className='w-[118px] px-1 font-sans text-xs font-normal leading-[15px]'>Invoice ID</span>
            <div className='flex gap-2.5 items-center'>
              <span className='font-sans text-xs font-[600] leading-[15px]'>1123434444</span>
              <span className='p-1 border border-secondary-130 rounded-[2px] custom-gradient bg-secondary-35 text-[10px] text-secondary-75 w-[53px] h-[15px] flex items-center '>PENDING</span>
            </div>
          </div>
          <div className='flex gap-3 items-center mt-2'>
            <span className='w-[118px] px-1 font-sans text-xs font-normal leading-[15px]'>Invoice Type</span>
            <span className='font-sans text-xs font-[600] leading-[15px]'>Cash Invoice</span>
          </div>
          <div className='flex gap-3 items-center mt-2'>
            <span className='w-[118px] px-1 font-sans text-xs font-normal leading-[15px]'>Tax Type</span>
            <span className='font-sans text-xs font-[600] leading-[15px]'>CGST & SGST</span>
          </div>
          <div className='flex gap-3 items-center mt-2'>
            <span className='w-[118px] px-1 font-sans text-xs font-normal leading-[15px]'>Created Date</span>
            <span className='font-sans text-xs font-[600] leading-[15px]'>10 September, 2024</span>
          </div>
          <div className='flex gap-3 items-center mt-2'>
            <span className='w-[118px] px-1 font-sans text-xs font-normal leading-[15px]'>State & Code</span>
            <div className='flex gap-2 items-center'>
              <span className='font-sans text-xs font-[600] leading-[15px]'>Tamil Nadu</span>
              <span className='p-2 rounded-[2px] custom-gradient bg-secondary-135 text-[10px] w-[21px] h-[15px] flex items-center justify-center '>32</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className = 'bg-secondary-60 opacity-75 w-full p-6 flex flex-col rounded-2xl my-[22px]'>
        <span className='font-Inter font-[600] text-sm'>Item Description</span>
        <div className='flex flex-col overflow-scroll scroll-none'>
          <div className='flex  w-full opacity-[0.6]'>
            <div className="flex ">
              <span className='w-[48px] px-4 py-3 flex justify-center items-center text-sm font-normal'>S.No</span>
              <span className='w-[385px] px-4 py-3 flex  items-center text-sm font-normal'>Description</span>
            </div>
            <div className="flex">
              <span className='w-[185px] px-4 py-3 flex justify-center items-center text-sm font-normal'>HSN No.</span>
              <span className='w-[103px] px-4 py-3 flex justify-center items-center text-sm font-normal'>Quality</span>
              <span className='w-[79px] px-4 py-3 flex justify-center items-center text-sm font-normal'>Rate</span>
              <span className='w-[112px] px-4 py-3 flex justify-center items-center text-sm font-normal'>Discount</span>
              <span className='w-[153px] px-4 py-3 flex justify-center items-center text-sm font-normal'>Amount</span>
            </div>
          </div>
          <div className='flex  w-full bg-white rounded-[16px]'>
            <div className="flex">
            <span className='w-[48px] px-4 py-3 flex justify-center items-center text-sm font-normal'>1</span>
            <span className='w-[385px] px-4 py-3 flex  items-center text-sm font-normal'>Apollo Electrical Services</span>
            </div>
            <div className="flex">
            <span className='w-[185px] px-4 py-3 flex justify-center items-center text-sm font-normal'>HSGFFD7564</span>
              <span className='w-[103px] px-4 py-3 flex justify-center items-center text-sm font-normal'>1,00,000</span>
              <span className='w-[79px] px-4 py-3 flex justify-center items-center text-sm font-normal'>₹ 75.00</span>
              <span className='w-[112px] px-4 py-3 flex justify-center items-center text-sm font-normal'>₹ 10,075.00</span>
              <span className='w-[153px] px-4 py-3 flex justify-center items-center text-sm font-normal'>₹ 75,00,000.00</span>
            </div>
          </div>
        </div>
        <div className='flex mt-[24px] gap-6 max-md:flex-col-reverse'>
          <div className="flex  justify-end items-end w-[100%] max-md:justify-start">
            <div className='flex flex-col'>
              <span className='text-sm opacity-[0.6]'>Total (in words)</span>
              <div className="h-[0.5px] bg-secondary-140 w-full my-3"></div>
              <span className='text-sm font-[600]'>Seventy five lakhs and three thousand</span>
            </div>
          </div>
          <div className="flex flex-col px-6 gap-3 ">
            <div className="flex">
              <span className='text-sm font-normal opacity-[0.6] w-[109px]'>Sub Total</span>
              <span className='text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]'>₹ 75,00,000.00</span>
            </div>
            <div className="flex">
              <span className='text-sm font-normal opacity-[0.6] w-[109px]'>PF Amount</span>
              <span className='text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]'>₹ 0</span>

            </div>
            <div className="flex">
              <span className='text-sm font-normal opacity-[0.6] w-[109px]'>CGST |  @ 9%</span>
              <span className='text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]'>₹ 0</span>

            </div>
            <div className="flex">
              <span className='text-sm font-normal opacity-[0.6] w-[109px]'>SGST | @ 9%</span>
              <span className='text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]'>₹ 0</span>

            </div>
            <div className="flex">
              <span className='text-sm font-normal opacity-[0.6] w-[109px]'>IGST | @ 18%</span>
              <span className='text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]'>₹ 3,000.98</span>
            </div>
            <div className="h-[0.5px] bg-secondary-140 w-full "></div>
            <div className="flex ">
              <span className='text-sm font-[600]  w-[115px]'>Total </span>
              <span className='text-sm font-[600] w-[115px]  '>₹ 75,03,000.00</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-4 justify-end py-[22px]'>
        <div className="relative inline-block text-left">
          <div className=''>
              <button id="dropdownButton" type="button" className="flex gap-2 justify-center items-center py-2 pr-4 border border-secondary-145 rounded-xl  text-[16px] font-normal leading-6">
              <span className='w-[186px]'>Original for Recipient</span>
              <img src={ICONS.invoicedropdown} alt="dropdown" />
              </button>
          </div>

          {/* Dropdown menu template*/}
          <div id="dropdownMenu" className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">India</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Pakistan</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Nepal</a>
            </div>
            </div>
        </div>
        <Button
          text="Print"
          color='bg-secondary-125 text-[14px] text-white text-xs'
          iconClassName="h-[24px] w-[31px]"
        />
      </div>

    </div>
  )
}

export default DetailPage