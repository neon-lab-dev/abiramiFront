import React from 'react'
import Button from '../../Components/Shared/Button/Button'
import { ICONS } from '../../assets'

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
    </div>
  )
}

export default DetailPage