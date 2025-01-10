import { ICONS } from "../../../assets";


type TInvoiceListCard = {
    subtitle:string;
    title:string;
    location: string;
    cardNo: string;
    phone: string;
    email: string;
}
const InvoiceListCard: React.FC<TInvoiceListCard> = ({ subtitle,title, location, cardNo, phone, email }) => {
    return (
        <div className='bg-secondary-60 opacity-75 w-[416px] p-6 flex flex-col rounded-2xl max-md:w-full'>
            <span className='font-sans text-xs font-normal leading-4 '>{subtitle}</span>
            <span className='font-sans text-lg font-[600] leading-9 my-2 '>{title}</span>
            <div className='flex gap-3 mb-2 '>
                <div>
                    <img src={ICONS.invoiceslocation} alt="" className='size-4' />
                </div>
                <div className='flex gap-0.5 flex-col '>
                    <span className='font-sans text-xs font-normal leading-[15px] '>{location}</span>
                    {/* <span className='font-sans text-xs font-normal leading-[15px] '>Address line 2</span>
                    <span className='font-sans text-xs font-normal leading-[15px] '>541087</span>
                    <span className='font-sans text-xs font-normal leading-[15px] '>Tamil Nadu, India</span> */}
                </div>
            </div>
            <div className='flex gap-3 items-center mb-[9px]'>
                <img src={ICONS.invoicescreditcard} alt="" />
                <span className='font-sans text-xs font-normal leading-[15px] '>{cardNo}</span>
            </div>
            <div className='flex gap-3 items-center mb-[9px]'>
                <img src={ICONS.invoicesmobile} alt="" />
                <span className='font-sans text-xs font-normal leading-[15px]  '>{phone}</span>
            </div>
            <div className='flex gap-3 items-center mb-[9px]'>
                <img src={ICONS.invoicesattherate} alt="" />
                <span className='font-sans text-xs font-normal leading-[15px] '>{email}</span>
            </div>
        </div>
    );
};


export default InvoiceListCard;


