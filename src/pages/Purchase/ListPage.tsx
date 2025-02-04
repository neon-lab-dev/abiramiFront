import PurchaseTable from "../../Components/Purchase/PurchaseTable";
import StatusCard from "../../Components/Shared/StatusCard/StatusCard";
import Button from "../../Components/Shared/Button/Button";
import { useNavigate } from "react-router-dom";
import { ICONS } from "../../assets";
import { useEffect, useState } from "react";
import { deletePurchase, getPurchases } from "../../api/api";
import { PurchaseData, PurchaseResponse } from "../../types/purchase";
import Loader from "../../lib/loader";
import UpdateModal from "./UpdateModal";
import { useSearch } from "../../context/SearchContext";

const ListPage = () => {
  const { searchQuery, searchResults } = useSearch();
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [purchases, setPurchases] = useState<PurchaseResponse>();
  const [purchaseData, setPurchaseData] = useState<PurchaseData>({
    totalPurchases: 0,
    activePurchases: 0,
    inactiveClinets: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToCreatePurchase = () => {
    navigate("/Purchase/CreatePurchase");
  };
  const editToggleModel = (id?: string) => {
    if (id) {
      setSelectedId(id);
    }
    setEditModalOpen(!isEditModalOpen);
  };

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      try {
        const response: PurchaseResponse = await getPurchases();
        setPurchaseData({
          totalPurchases: response.totalPurchases,
          activePurchases: response.activePurchases,
          inactiveClinets: response.inactiveClinets,
        });
        setPurchases(response);
      } catch (error) {
        console.error("Get clients error:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const handleDelete = async (id: string) => {
    setLoading(true);
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await deletePurchase(id);
        console.log("Item deleted!", response);
        if (response.status === 200) {
          alert("Purchase deleted Successfully!!!");
          navigate(0);
        }
      } catch (error) {
        console.error("Delete purchase error:", error);
        alert("Failed to delete purchase.");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Delete action canceled.");
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full py-2 mb-2 flex justify-between items-center">
            <h3 className="font-bold px-2">Purchase list page</h3>
            <Button
              text="Create Purchase"
              imgSrc={ICONS.clientOutline}
              color="bg-secondary-120 text-[14px] text-secondary-125"
              iconClassName="h-[24px] w-[24px]"
              onClick={handleNavigateToCreatePurchase}
            />
          </div>
          <div className="flex gap-6 mb-[22px] w-full max-md:flex-col max-md:w-full ">
            <StatusCard
              cardBg="bg-secondary-10"
              iconBg="bg-secondary-65"
              title="Total Clients"
              value={purchaseData.totalPurchases}
              cardWidth="w-[416px]"
              icon={ICONS.clienticon}
            />
            <StatusCard
              cardBg="bg-secondary-30"
              iconBg="bg-secondary-70"
              title="Active Clients"
              value={purchaseData.activePurchases}
              cardWidth="w-[416px]"
              icon={ICONS.clienticon2}
            />
            <StatusCard
              cardBg="bg-secondary-40"
              iconBg="bg-secondary-85"
              title="Inactive Clients"
              value={purchaseData.inactiveClinets}
              cardWidth="w-[416px]"
              icon={ICONS.clienticon3}
            />
          </div>
          <PurchaseTable
            purchases={
              searchQuery.trim() === "" || searchResults.length === 0
                ? purchases?.data
                : searchResults?.data
            }
            editToggleModel={editToggleModel}
            handleDelete={handleDelete}
          />
          {/* Modal Overlay */}
          {isEditModalOpen && (
            <UpdateModal
              editToggleModel={editToggleModel}
              selectedId={selectedId}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ListPage;
