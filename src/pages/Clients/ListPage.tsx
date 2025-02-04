import { useNavigate } from "react-router-dom";
import { ICONS } from "../../assets";
import ClientTable from "../../Components/Clients/ClientTable";
import Button from "../../Components/Shared/Button/Button";
import StatusCard from "../../Components/Shared/StatusCard/StatusCard";
import { useEffect, useState } from "react";
import { deleteClient, getClients } from "../../api/api";
import Loader from "../../lib/loader";
import UpdateModal from "./UpdateModal";
import { useSearch } from "../../context/SearchContext";
import { ClientResponse } from "../../types/client";

const ListPage = () => {
  const { searchQuery, searchResults } = useSearch();
  const [clients, setClients] = useState<ClientResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();

  const editToggleModel = (id: string) => {
    setSelectedId(id);
    setEditModalOpen(!isEditModalOpen);
  };
  const handlenavigatetocreatesupplier = () => {
    navigate("/clients/CreateClients");
  };

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const data: ClientResponse = await getClients();
        setClients(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await deleteClient(id);
      console.log("Item deleted!", response);
      if (response.status === 200) {
        alert("Client deleted Successfully!!!");
        navigate(0);
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
        <div>
          <div className="flex justify-between  mb-[22px] ">
            <span className="font-Inter  text-sm font-semibold ml-2 ">
              Clients list
            </span>
            <Button
              text="Create Client"
              imgSrc={ICONS.clientOutline}
              color="bg-secondary-120 text-[14px] text-secondary-125"
              iconClassName="h-[24px] w-[24px]"
              onClick={handlenavigatetocreatesupplier}
            />
          </div>
          <div className="flex gap-7 mb-[22px] w-full max-md:flex-col max-md:w-full ">
            <StatusCard
              cardBg="bg-secondary-10"
              iconBg="bg-secondary-65"
              title="Total Clients"
              value={clients?.totalCount}
              cardWidth="w-[416px]"
              icon={ICONS.clienticon}
            />
            <StatusCard
              cardBg="bg-secondary-30"
              iconBg="bg-secondary-70"
              title="Active Clients"
              value={clients?.activeCount}
              cardWidth="w-[416px]"
              icon={ICONS.clienticon2}
            />
            <StatusCard
              cardBg="bg-secondary-40"
              iconBg="bg-secondary-85"
              title="Inactive Clients"
              value={clients?.inactiveCount}
              cardWidth="w-[416px]"
              icon={ICONS.clienticon3}
            />
          </div>
          <ClientTable
            clients={
              (searchQuery?.trim() === "" || searchResults?.length === 0
                ? clients
                : searchResults) || {}
            }
            editToggleModel={editToggleModel}
            handleDelete={handleDelete}
          />
        </div>
      )}
      {/* Modal Overlay */}
      {isEditModalOpen && (
        <UpdateModal
          editToggleModel={editToggleModel}
          selectedId={selectedId}
        />
      )}
    </>
  );
};

export default ListPage;
