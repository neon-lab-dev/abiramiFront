import React, { useEffect, useState } from "react";
import Button from "../../Components/Shared/Button/Button";
import { ICONS } from "../../assets";
import StatusCard from "../../Components/Shared/StatusCard/StatusCard";
import DashboardTable from "../../Components/Dashboard/DashboardTable";
import { useNavigate, useParams } from "react-router-dom";
import { deleteClient, getClientById, getInvoiceById } from "../../api/api";
import { formatDateWithOrdinal, formatNumber } from "../../utils";
import Loader from "../../lib/loader";
import UpdateModal from "../Invoices/UpdateModal";
import UpdateClientModal from "./UpdateModal";
import CreateModel from "../Invoices/CreateModel";
import { Client, SingleClientResponse } from "../../types/client";
import { generateInvoicePDF } from "../../utils/handleInvoice";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [client, setClient] = useState<Client>();
  const [invoiceData, setInvoiceData] = useState<SingleClientResponse>();
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isClientEditModalOpen, setClientEditModalOpen] =
    useState<boolean>(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const editToggleModel = (id?: string) => {
    setEditModalOpen(!isEditModalOpen);
    setSelectedId(id ?? "");
  };

  const editToggleClientModel = (id: string) => {
    setClientEditModalOpen(!isClientEditModalOpen);
    setSelectedClientId(id);
  };

  const createToggleModel = () => {
    navigate("/Invoices/CreateInvoices");
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
  useEffect(() => {
    const fetchClient = async () => {
      setLoading(true);
      try {
        if (id) {
          const data: SingleClientResponse = await getClientById(id);
          setInvoiceData(data);
          setClient(data?.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await deleteClient(id || "");
      if (response.status === 200) {
        alert("Client deleted Successfully!!!");
        navigate("/clients");
      }
    } else {
      console.log("Delete action canceled.");
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div>
            <span className="font-Inter text-sm font-semibold ml-2 ">
              Clients Detail Page
            </span>
            <div className="flex justify-end mt-[22px] mb-4 gap-[22px]">
              <Button
                text="Edit"
                imgSrc={ICONS.clientediticon}
                color="bg-secondary-155 text-[14px] text-black"
                iconClassName=" "
                onClick={() => editToggleClientModel(id || "")}
              />
              <Button
                text="Delete"
                imgSrc={ICONS.clientdeleteicon}
                color="bg-primary-30 text-[14px] text-white"
                iconClassName=" "
                onClick={handleDelete}
              />
            </div>

            <div className="flex gap-7 max-md:flex-col">
              <div className="p-6 w-[471px] h-fit bg-secondary-160 rounded-[16px] flex gap-3 max-md:flex-col">
                <div className="w-[52px] h-[52px] bg-blue-100 rounded-[38px] flex justify-center items-center">
                  <img
                    src={ICONS.clienticon}
                    alt=""
                    className="w-[24px] h-[24px] rounded-full"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="font-inter text-[18px] font-medium leading-[36px]
              "
                    >
                      {client?.companyName}
                    </span>
                    <span className="bg-secondary-165 py-1 px-3 text-primary-50 rounded-[12px] w-[67px] h-7 flex items-center justify-center">
                      {client?.status}
                    </span>
                  </div>
                  <div className="flex flex-col mt-4">
                    <div className="flex gap-2">
                      <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[75px] ">
                        GST
                      </span>
                      <span className="font-inter text-[12px] font-normal leading-[18px] w-[109px] ">
                        {client?.GST}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[75px]">
                        Created on
                      </span>
                      <span className="font-inter text-[12px] font-normal leading-[18px] w-[150px] ">
                        {/* 08th September, 2024 */}
                        {formatDateWithOrdinal(client?.createdAt || "")}
                      </span>
                    </div>
                  </div>
                  <div className=" relative mt-7">
                    <Button
                      text="Create Invoice"
                      imgSrc={ICONS.invoicescreateicon}
                      color="bg-secondary-120 text-[14px] text-secondary-125"
                      iconClassName="h-[24px] w-[24px]"
                      onClick={createToggleModel}
                    />
                    <img
                      src={ICONS.invoicesvector}
                      alt=""
                      className=" absolute top-[9.79px] left-[40px] size-1.5"
                    />
                  </div>
                </div>
              </div>
              {/* client detials */}
              <div className=" p-6 flex flex-col gap-4 w-full h-[232px] max-lg:h-fit bg-secondary-160 rounded-[16px]">
                <div className="flex gap-2">
                  <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                    Contact Person
                  </span>
                  <span className="font-inter text-[12px] font-normal leading-[18px] ">
                    {client?.contactPerson}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                    Mobile
                  </span>
                  <span className="font-inter text-[12px] font-normal leading-[18px]">
                    {client?.mobileNum}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                    Location
                  </span>
                  <span className="font-inter text-[12px] w-fit font-normal leading-[18px]">
                    {" "}
                    {/* Plot No. 21, KIADB Industrial Area, Phase 2, Peenya
                    Industrial Estate, Tumkur Road, Bangalore - 560058,
                    Karnataka, India */}
                    {client?.addressLine1 }{ client?.addressLine2 }{client?.addressLine3} {client?.city}{client?.state}  {client?.country}{client?.pincode}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                    Total Income
                  </span>
                  <span className="font-inter text-[12px] font-normal leading-[18px] ">
                    ₹ {formatNumber(invoiceData?.totalIncome ?? 0)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                    Total Invoices
                  </span>
                  <span className="font-inter text-[12px] font-normal leading-[18px] ">
                    {invoiceData?.totalInvoices}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between  my-[22px] ">
              <span className="font-Inter  text-sm font-semibold ml-2 ">
                Invoices
              </span>
            </div>
            <div className="flex gap-7 mb-[22px] w-full max-md:flex-col max-md:w-full ">
              <StatusCard
                cardBg="bg-secondary-10"
                iconBg="bg-secondary-65"
                title="Total Invoices"
                value={invoiceData?.totalInvoices}
                cardWidth="w-[416px]"
                icon={ICONS.clienticon}
              />
              <StatusCard
                cardBg="bg-secondary-30"
                iconBg="bg-secondary-70"
                title="Paid Invoices"
                value={invoiceData?.paidInvoices}
                cardWidth="w-[416px]"
                icon={ICONS.clienticon2}
              />
              <StatusCard
                cardBg="bg-secondary-40"
                iconBg="bg-secondary-85"
                title="Pending Invoices"
                value={invoiceData?.pendingInvoices}
                cardWidth="w-[416px]"
                icon={ICONS.clienticon3}
              />
            </div>
            <DashboardTable
              invoices={client?.invoice}
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
            />
          )}

          {isCreateModalOpen && (
            <CreateModel
              createToggleModel={createToggleModel}
              clientName={client?.companyName}
            />
          )}

          {isClientEditModalOpen && (
            <UpdateClientModal
              editToggleModel={editToggleClientModel}
              selectedId={selectedClientId}
            />
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default DetailPage;
