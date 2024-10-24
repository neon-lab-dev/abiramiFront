import Button from '../../Components/Shared/Button/Button'
import StatusCard from '../../Components/Shared/StatusCard/StatusCard'
import { ICONS } from '../../assets'

const ListPage = () => {
  return (
    <div>
        <div className='flex justify-between mb-[22px] '>
            <span className='font-Inter  text-sm font-semibold ml-2 '>Invoice list page</span>
            <Button
            text="Create Invoice"
            imgSrc={ICONS.clientOutline}   
            color='bg-secondary-120 text-[14px] text-secondary-125'
            iconClassName="h-[24px] w-[24px]"
            />
        </div>
        <div className='flex gap-2 mb-[22px] max-md:justify-between '>
            <span className='flex justify-center items-center pr-4 font-normal text-[14px] leading-[20px] '>Invoice Type</span>
            <div className="relative inline-block text-left">
                <div className=''>
                    <button id="dropdownButton" type="button" className="flex gap-2 justify-center items-center py-2 pr-4 bg-neutral-70 rounded-xl font-sans text-base font-normal leading-6">
                    <span className='w-[117px]'>Cash Invoice</span>
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
        </div>
        <div className='flex gap-7 mb-[22px] w-full max-md:flex-col max-md:w-full '>
            <StatusCard
                cardBg="bg-secondary-10"
                iconBg="bg-secondary-65"
                title="Paid Invoices"
                value="7265"
                cardWidth='w-[416px]'
                icon={ICONS.invoices}
            />
            <StatusCard
                cardBg="bg-secondary-30"
                iconBg="bg-secondary-70"
                title="Pending Amount"
                value="10"
                cardWidth='w-[416px]'
                icon={ICONS.invoices2}
            />
            <StatusCard
                cardBg="bg-secondary-40"
                iconBg="bg-secondary-85"
                title="Draft Invoices"
                value="0"
                cardWidth='w-[416px]'
                icon={ICONS.invoices3}
            />
        </div>
    </div>
  )
}

export default ListPage