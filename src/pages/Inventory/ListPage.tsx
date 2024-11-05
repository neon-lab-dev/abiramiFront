import StatusCard from "../../Components/Shared/StatusCard/StatusCard"
import Button from "../../Components/Shared/Button/Button"
import { useNavigate } from 'react-router-dom';
import { ICONS } from "../../assets"
import InventoryListPageTable from "../../Components/Inventory/InventoryTable";


const ListPage = () => {

  const navigate = useNavigate();

  const handleNavigateToCreatePurchase = () => {
    navigate("/Purchase/CreatePurchase");
  };
  return (<div className="w-full" >
    
    <div className="w-full py-2 mb-2 flex justify-between items-center">
        <h3 className="font-bold px-2">Inventory list page</h3>
      <Button
        text="Create Inventory"
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
        cardBg="bg-secondary-170"
        iconBg="bg-primary-30"
        title="Inactive Clients"
        value="5"
        cardWidth='w-[416px]'
        icon={ICONS.clienticon3}
      />
    </div>
    <InventoryListPageTable/>
  </div>
)
}

export default ListPage