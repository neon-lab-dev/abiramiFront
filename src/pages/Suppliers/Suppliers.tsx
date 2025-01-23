import { useEffect, useState } from "react";
import { deleteClient, getSuppliers } from "../../api/api";
import ListPage from "./ListPage";
import SuppliersCards from "./SuppliersCards";
import SuppliersTable from "../../Components/Suppliers/SuppliersTable";
import Loader from "../../lib/loader";
import UpdateModal from "./UpdateModal";
import { useNavigate } from "react-router-dom";

export default function Suppliers() {
  const [loading, setLoading] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();
  const editToggleModel = (id: string) => {
    setSelectedId(id);
    setEditModalOpen(!isEditModalOpen);
  };
  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      try {
        const data: any[] = await getSuppliers();
        setSuppliers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await deleteSuppliers(id);
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
        <div className="w-full">
          <SuppliersCards suppliers={suppliers} />
          <SuppliersTable
            suppliers={suppliers.data}
            editToggleModel={editToggleModel}
            handleDelete={handleDelete}
          />
        </div>
      )}
      {isEditModalOpen && (
        <UpdateModal
          editToggleModel={editToggleModel}
          selectedId={selectedId}
        />
      )}
    </>
  );
}
