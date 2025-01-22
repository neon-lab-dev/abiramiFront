import { Link } from "react-router-dom";
import { ICONS } from "../../assets";
import Button from "../../Components/Shared/Button/Button";
import StatusCard from "../../Components/Shared/StatusCard/StatusCard";
import { useEffect, useState } from "react";
import { getSuppliers } from "../../api/api";

export default function SuppliersCards() {
  const [suppliers, setSuppliers] = useState([]);
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data: any[] = await getSuppliers();
        setSuppliers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSuppliers();
  }, []);
  console.log(suppliers);
  return (
    <div className="w-full ">
      <div className="w-full py-2 mb-2 flex justify-between items-center">
        <h3 className="font-bold">Supplier list page</h3>
        <Link to={"/Suppliers/CreateSupplier"}>
          <Button
            text="Create Supplier"
            imgSrc={ICONS.button}
            color="bg-secondary-120 text-primary-20"
          />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatusCard
          cardBg="bg-secondary-10"
          iconBg="bg-secondary-65"
          title="Total Suppliers"
          value={suppliers.totalCount}
          icon={ICONS.SupplierIcon2}
        />
        <StatusCard
          cardBg="bg-secondary-20"
          iconBg="bg-secondary-75"
          title="Active Suppliers"
          value={suppliers.activeCount}
          icon={ICONS.SupplierIcon1}
        />
        <StatusCard
          cardBg="bg-secondary-40"
          iconBg="bg-secondary-85"
          title="Inactive Suppliers"
          value={suppliers.inactiveCount}
          icon={ICONS.SupplierIcon3}
        />
      </div>
    </div>
  );
}
