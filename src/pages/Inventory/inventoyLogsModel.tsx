import React, { useState, useEffect } from "react";
import { ICONS } from "../../assets";
import InventoryLogsTable from "../../Components/Inventory/InventoryLogsTable";
import Loader from "../../lib/loader";
import { getInventoryById, getInventoryLogsById } from "../../api/api"; // Ensure API function is imported
import { InventoryItem } from "../../types/inventory";
import { LogApiResponse } from "../../types/logs";

const InventoryLogsModal = ({
  isOpen,
  LogToggleModal,
  selectedId,
}: {
  isOpen: boolean;
  LogToggleModal: () => void;
  selectedId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inventoryLogs, setInventoryLogs] = useState<LogApiResponse>();
  const [inventory, setInventory] = useState<InventoryItem | null>(null);

  useEffect(() => {
    if (isOpen && selectedId) {
      fetchInventoryLogs();
    }
  }, [isOpen, selectedId]);

  const fetchInventoryLogs = async () => {
    setLoading(true);
    try {
      const logs = await getInventoryLogsById(selectedId);
      const inventorydata = await getInventoryById(selectedId);
      setInventoryLogs(logs);
      setInventory(inventorydata.data);
    } catch (error) {
      console.error("Error fetching inventory logs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-6 w-[70%] h-[550px] shadow-lg overflow-y-scroll custom-scrollbar scroll-none">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="flex justify-between pb-4">
              <span className="font-Inter font-[600] text-sm">
                Inventory Logs
              </span>
              <img
                src={ICONS.close}
                alt="Close"
                onClick={LogToggleModal}
                className="cursor-pointer"
              />
            </div>

            {/* Inventory Details */}
            <div className="w-full pb-[22px] grid grid-cols-1 md:grid-cols-2  gap-9">
              <div className="text-black whitespace-nowrap overflow-hidden text-ellipsis">
                Product ID: {inventory?.id}
              </div>
              <div className="text-black whitespace-nowrap overflow-hidden text-ellipsis">
                Available Quantity: {inventory?.quantity}
              </div>
            </div>

            <div className="border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed mb-[22px]"></div>

            {/* Inventory Logs Table */}
            <InventoryLogsTable data={inventoryLogs?.data || []} />
          </>
        )}
      </div>
    </div>
  );
};

export default InventoryLogsModal;
