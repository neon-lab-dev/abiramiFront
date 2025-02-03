import { useEffect, useState } from "react";
import { deleteSupplier, getSuppliers } from "../../api/api";
import ListPage from "./ListPage";
import SuppliersCards from "./SuppliersCards";
import SuppliersTable from "../../Components/Suppliers/SuppliersTable";
import Loader from "../../lib/loader";
import UpdateModal from "./UpdateModal";
import { useNavigate } from "react-router-dom";
import { Supplier, SupplierData, SupplierResponse } from "../../types/supplier";
import { useSearch } from "../../context/SearchContext";

export default function Suppliers() {
  const { searchQuery, searchResults } = useSearch();
  const [loading, setLoading] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [suppliersData, setSuppliersData] = useState<SupplierData>();
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
        const response: SupplierResponse = await getSuppliers();
        setSuppliersData({
          totalCount: response.totalCount,
          activeCount: response.activeCount,
          inactiveCount: response.inactiveCount,
        });
        setSuppliers(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id: string) => {
    setLoading(true);
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await deleteSupplier(id);
      console.log("Item deleted!", response);
      if (response.status === 200) {
        alert("Supplier deleted Successfully!!!");
        navigate(0);
      }
    } else {
      console.log("Delete action canceled.");
    }
  };

  console.log(suppliers);
  console.log(searchResults);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full">
          <SuppliersCards suppliers={suppliersData} />
          <SuppliersTable
            suppliers={
              searchQuery.trim() === "" || searchResults.length === 0
                ? suppliers
                : searchResults?.data
            }
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
