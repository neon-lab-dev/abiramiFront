import React, { useEffect, useRef, useState } from "react";
import InvoiceListPageTable from "../../Components/Invoices/InvoiceListPageTable";
import Button from "../../Components/Shared/Button/Button";
import StatusCard from "../../Components/Shared/StatusCard/StatusCard";
import { ICONS } from "../../assets";
import { useNavigate } from "react-router-dom";
import { deleteInvoice, getInvoiceById, getInvoices } from "../../api/api";
import UpdateModal from "./UpdateModal";
import Loader from "../../lib/loader";
import { useSearch } from "../../context/SearchContext";
import { InvoicesResponse } from "../../types/invoice";
import { generateInvoicePDF } from "../../utils/handleInvoice";

const ListPage = () => {
  const { searchQuery, searchResults } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<InvoicesResponse>();
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const handlenavigatetocreateinvoices = () => {
    navigate("/Invoices/CreateInvoices");
  };

  const editToggleModel = (id?: string) => {
    setSelectedId(id ?? "");
    setEditModalOpen(!isEditModalOpen);
  };

  const handleDelete = async (id?: string) => {
    if (id && window.confirm("Are you sure you want to delete?")) {
      const response = await deleteInvoice(id);
      if (response.status === 200) {
        alert("Invoice deleted Successfully!!!");
        navigate(0);
      }
    } else {
      console.log("Delete action canceled.");
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const data: InvoicesResponse = await getInvoices();
        setInvoices(data);
       console.log(data)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Optional: Close the dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  const handlePrint =async (id: string, state?: string) => {
      if (!state) {
        console.error("State is undefined");
        return;
      }
      const invoiceData = await getInvoiceById(id);
      const pdfData = invoiceData.data;
      console.log(pdfData);
      generateInvoicePDF(pdfData ,state);
    }
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
            <h3 className="font-bold px-2">Invoicelist page</h3>
            <Button
              text="Create Invoice"
              imgSrc={ICONS.invoicescreateicon}
              color="bg-secondary-120 text-[14px] text-secondary-125"
              iconClassName="h-[24px] w-[24px]"
              onClick={handlenavigatetocreateinvoices}
            />
          </div>
          <div className="flex gap-2 mb-[22px] max-md:justify-between ">
            <span className="flex justify-center items-center pr-4 font-normal text-[14px] leading-[20px] ">
              Invoice Type
            </span>
            <div className="relative inline-block text-left">
              <div className="w-[177px]" onClick={handleToggle}>
                <button
                  id="dropdownButton"
                  type="button"
                  className="flex gap-2 justify-center items-center py-2 pr-4 bg-neutral-70 rounded-xl font-sans text-base font-normal leading-6"
                >
                  <span className="w-[117px]">Cash Invoice</span>
                  <img src={ICONS.invoicedropdown} alt="dropdown" />
                </button>
              </div>

              {isOpen && (
                <div
                  id="dropdownMenu"
                  className="origin-top-right absolute right-0 mt-2 w-[177px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-20"
                      role="menuitem"
                    >
                      Cheque Invoice
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-20"
                      role="menuitem"
                    >
                      Tax invoice
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-20"
                      role="menuitem"
                    >
                      Quote Invoice
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-7 mb-[22px] w-full max-md:flex-col max-md:w-full ">
            <StatusCard
              cardBg="bg-secondary-10"
              iconBg="bg-secondary-65"
              title="Paid Invoices"
              value={invoices?.paidInvoices}
              cardWidth="w-[416px]"
              icon={ICONS.invoices}
            />
            <StatusCard
              cardBg="bg-secondary-30"
              iconBg="bg-secondary-70"
              title="Pending Amount"
              value={invoices?.pendingInvoices}
              cardWidth="w-[416px]"
              icon={ICONS.invoices2}
            />
            <StatusCard
              cardBg="bg-secondary-40"
              iconBg="bg-secondary-85"
              title="Draft Invoices"
              value={invoices?.draftInvoices}
              cardWidth="w-[416px]"
              icon={ICONS.invoices3}
            />
          </div>
          <div className="my-[22px]">
            <InvoiceListPageTable
              invoices={
                searchQuery.trim() === "" || searchResults.length === 0
                  ? invoices?.data
                  : searchResults?.data
              }
              editToggleModel={editToggleModel}
              handleDelete={handleDelete}
              handlePrint={handlePrint}
            />
          </div>
          {/* Modal Overlay */}
          {isEditModalOpen && (
            <UpdateModal
              editToggleModel={editToggleModel}
              selectedId={selectedId}
              setEditModalOpen={setEditModalOpen}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ListPage;
