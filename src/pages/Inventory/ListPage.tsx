import StatusCard from "../../Components/Shared/StatusCard/StatusCard";
import Button from "../../Components/Shared/Button/Button";
import { useNavigate } from "react-router-dom";
import { ICONS } from "../../assets";
import CatagoryList from "../../Components/Inventory/CatagoryList";
import { useEffect, useState } from "react";
import { getInventoryData } from "../../api/api";
import Loader from "../../lib/loader";
import { InventoryData, InventoryResponse } from "../../types/inventory";

const ListPage = () => {
  const navigate = useNavigate();
  // const [inventories, setInventories] = useState<InventoryResponse>();
  const [inventoryData, setInventoryData] = useState<InventoryData>();
  const [loading, setLoading] = useState(false);
  const handleNavigateToCreateInventory = () => {
    navigate("/inventory/createInventory");
  };

  // useEffect(() => {
  //   const fetchInventories = async () => {
  //     setLoading(true);
  //     try {
  //       const data: InventoryResponse = await getInventories();
  //       setInventories(data);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchInventories();
  // }, []);

  useEffect(() => {
    const fetchInventoryData = async () => {
      setLoading(true);
      try {
        const response: InventoryResponse = await getInventoryData();
        if (response.statusText === "OK") {
          setInventoryData(response?.data as unknown as InventoryData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full py-2 mb-2 flex justify-between items-center">
            <h3 className="font-bold px-2">Inventory list page</h3>
            <Button
              text="Create Inventory"
              imgSrc={ICONS.inventory}
              color="bg-secondary-120 text-[14px] text-secondary-125"
              iconClassName="h-[24px] w-[24px]"
              onClick={handleNavigateToCreateInventory}
            />
          </div>
          <div className="flex gap-6 mb-[22px] w-full max-md:flex-col max-md:w-full ">
            <StatusCard
              cardBg="bg-secondary-10"
              iconBg="bg-secondary-65"
              title="Total Item"
              value={inventoryData?.totalQuantity}
              cardWidth="w-[416px]"
              icon={ICONS.inventoryBlue}
            />
            <StatusCard
              cardBg="bg-secondary-30"
              iconBg="bg-secondary-70"
              title="Low in stock"
              value={inventoryData?.lowStock}
              cardWidth="w-[416px]"
              icon={ICONS.inventoryYellow}
            />
            <StatusCard
              cardBg="bg-secondary-170"
              iconBg="bg-primary-30"
              title="Out of stock"
              value={inventoryData?.outOfStock}
              cardWidth="w-[416px]"
              icon={ICONS.inventoryRed}
            />
          </div>
          <CatagoryList />
        </div>
      )}
    </>
  );
};

export default ListPage;
