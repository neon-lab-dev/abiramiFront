import PurchaseTable from "../../Components/Purchase/PurchaseTable"
import StatusCard from "../../Components/Shared/StatusCard/StatusCard"
import Button from "../../Components/Shared/Button/Button"
import { useNavigate } from 'react-router-dom';
import { ICONS } from "../../assets"


const ListPage = () => {

  const navigate = useNavigate();

  const handleNavigateToCreatePurchase = () => {
    navigate("/Purchase/CreatePurchase");
  };
  return (<div>
    <div className='flex justify-between mb-[22px] '>
      <span className='font-Inter  text-sm font-semibold ml-2 '>Purchase list page</span>
      <Button
        text="Create Client"
        imgSrc={ICONS.clientOutline}   
        color='bg-secondary-120 text-[14px] text-secondary-125'
        iconClassName="h-[24px] w-[24px]"
        onClick={handleNavigateToCreatePurchase}
      />

    </div>
    <div className='flex gap-6 mb-[22px] w-full max-md:flex-col max-md:w-full '>
      <StatusCard
        cardBg="bg-secondary-10"
        iconBg="bg-secondary-65"
        title="Total Clients"
        value="7265"
        cardWidth='w-[416px]'
        icon={ICONS.clienticon}
      />
      <StatusCard
        cardBg="bg-secondary-30"
        iconBg="bg-secondary-70"
        title="Active Clients"
        value="17265"
        cardWidth='w-[416px]'
        icon={ICONS.clienticon2}
      />
      <StatusCard
        cardBg="bg-secondary-40"
        iconBg="bg-secondary-85"
        title="Inactive Clients"
        value="5"
        cardWidth='w-[416px]'
        icon={ICONS.clienticon3}
      />
    </div>
    <PurchaseTable/>
  </div>
)
}

export default ListPage