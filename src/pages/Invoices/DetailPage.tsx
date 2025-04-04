import { useEffect, useState } from "react";
import InvoiceListCard from "../../Components/Reusable/InvoiceListCard/InvoiceListCard";
import Button from "../../Components/Shared/Button/Button";
import { ICONS } from "../../assets";
import { useNavigate, useParams } from "react-router-dom";
import { getInvoiceById } from "../../api/api";
import { InvoiceData, InvoiceResponseWithClient } from "../../types/invoice";
import {
  convertNumberToWords,
  formatDateWithOrdinal,
  formatNumber,
} from "../../utils";
import Loader from "../../lib/loader";
import { generateInvoicePDF } from "../../utils/handleInvoice";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [invoiceData, setInvoiceData] = useState<InvoiceData>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const options = [
    "Original for Recipient",
    "Duplicate for Transporter",
    "Triplicate for Supplier",
    "Extra Copy",
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const navigate = useNavigate();

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handlenavigatetocreateinvoices = () => {
    navigate("/Invoices/CreateInvoices");
  };

  const tableHeaders = [
    "S.No",
    "Description",
    "HSN No.",
    "Quantity",
    "Rate",
    "Discount",
    "Amount",
  ];

  useEffect(() => {
    const fetchInvoiceById = async () => {
      setLoading(true);
      try {
        if (id) {
          const response: InvoiceResponseWithClient = await getInvoiceById(id);
          setInvoiceData(response.data);
        }
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoiceById();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="flex justify-between mb-[22px] ">
            <span className="font-Inter text-sm font-semibold ml-2 ">
              Invoice list page
            </span>
            <div className=" relative">
              <Button
                text="Create Invoice"
                imgSrc={ICONS.invoicescreateicon}
                color="bg-secondary-120 text-[14px] text-secondary-125"
                iconClassName="h-[24px] w-[24px]"
                onClick={handlenavigatetocreateinvoices}
              />
              <img
                src={ICONS.invoicesvector}
                alt=""
                className=" absolute top-[9.79px] left-[40px] size-1.5"
              />
            </div>
          </div>

          <div className="flex overflow-x-scroll scrollbar-hide gap-7 max-md:flex-col">
            <div className="flex-1">
              <InvoiceListCard
                subtitle={"From"}
                title={"Abirami Enterpirses"}
                location={
                  "1052, Bharathpur road, PN Palayam, Coimbatore, Address line 2"
                }
                cardNo={"33ACVPC901G1ZS"}
                phone={"+91 99986 98765, 04321 987651"}
                email={"+91 99986 98765, 04321 987651"}
              />
            </div>
            <div className="flex-1">
              <InvoiceListCard
                subtitle={"To"}
                title={invoiceData?.clientName || ""}
                location={[
                  invoiceData?.client?.addressLine1,
                  invoiceData?.client?.addressLine2,
                  invoiceData?.client?.addressLine3,
                  invoiceData?.client?.city,
                  invoiceData?.client?.state,
                  invoiceData?.client?.pincode,
                ]
                  .filter(Boolean)
                  .join(", ")}
                cardNo={invoiceData?.client?.GST || ""}
                phone={`${invoiceData?.client?.mobileNum}${
                  invoiceData?.client?.landLineNum &&
                  `, ${invoiceData?.client?.landLineNum}`
                }`}
                email={invoiceData?.client?.email || ""}
              />
            </div>
            {/* billing info */}
            <div className="flex-1 bg-secondary-60 opacity-75 p-6 flex flex-col rounded-2xl max-md:w-full">
              <span className="font-sans text-xs font-normal leading-4 ">
                Billing Details
              </span>
              <div className="flex gap-3 items-center mt-[20px]">
                <span className="w-[118px] px-1 font-sans text-xs font-normal leading-[15px]">
                  Invoice ID
                </span>
                <div className="flex items-center gap-2">
                  <span className="flex-1 font-sans text-xs font-[600] ">
                    {invoiceData?.invoiceId}
                  </span>
                  <span className=" w-fit  h-[15px] p-1 border border-secondary-130 rounded-[2px] custom-gradient bg-secondary-35 text-[10px] text-secondary-75 flex items-center ">
                    {invoiceData?.billingStatus.toUpperCase() ===
                    "DRAFT/PERFORMA INVOICE"
                      ? "DRAFT"
                      : invoiceData?.billingStatus.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <span className="w-[118px] px-1 font-sans text-xs font-normal leading-[15px]">
                  Invoice Type
                </span>
                <span className="font-sans text-xs font-[600] leading-[15px]">
                  {invoiceData?.invoiceType}
                </span>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <span className="w-[118px] px-1 font-sans text-xs font-normal leading-[15px]">
                  Tax Type
                </span>
                <span className="font-sans text-xs font-[600] leading-[15px]">
                  {invoiceData?.taxType}
                </span>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <span className="w-[118px] px-1 font-sans text-xs font-normal leading-[15px]">
                  Created Date
                </span>
                <span className="font-sans text-xs font-[600] leading-[15px]">
                  {formatDateWithOrdinal(
                    invoiceData?.createdAt ? invoiceData?.createdAt : ""
                  )}
                </span>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <span className="w-[118px] px-1 font-sans text-xs font-normal leading-[15px]">
                  State & Code
                </span>
                <div className="flex gap-2 items-center">
                  <span className="font-sans text-xs font-[600] leading-[15px]">
                    {invoiceData?.state}
                  </span>
                  <span className="p-2 rounded-[2px] custom-gradient bg-secondary-135 text-[10px] w-[21px] h-[15px] flex items-center justify-center ">
                    {invoiceData?.code}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary-60 opacity-75 w-full p-6 flex flex-col rounded-2xl my-[22px]">
            <span className="font-Inter font-[600] text-sm">
              Item Description
            </span>

            {/* Scrollable Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full mt-4 border-collapse overflow-x-auto">
                {/* Table Header */}
                <thead className="opacity-[0.6]">
                  <tr>
                    {tableHeaders.map((header, index) => (
                      <th
                        key={index}
                        className="px-4 py-3 text-left text-sm font-normal"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {invoiceData?.productDetails.map((row, index) => (
                    <tr key={row.id} className="bg-white rounded-[16px] ">
                      <td className="px-4 py-3 text-sm font-normal">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm font-normal">
                        {row.description}
                      </td>
                      <td className="px-4 py-3 text-sm font-normal">
                        {row.HSNno}
                      </td>
                      <td className="px-4 py-3 text-sm font-normal">
                        {row.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm font-normal">
                        {row.rate}
                      </td>
                      <td className="px-4 py-3 text-sm font-normal">
                        {row.discount}
                      </td>
                      <td className="px-4 py-3 text-sm font-normal">
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex mt-[24px] gap-6 max-md:flex-col-reverse">
              <div className="flex  justify-end items-end w-[100%] max-md:justify-start">
                <div className="flex flex-col">
                  <span className="text-sm opacity-[0.6]">
                    Total (in words)
                  </span>
                  <div className="h-[0.5px] bg-secondary-140 w-full my-3"></div>
                  <span className="text-sm font-[600]">
                    {convertNumberToWords(invoiceData?.totalAmount ?? 0)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col px-6 gap-3 ">
                <div className="flex">
                  <span className="text-sm font-normal opacity-[0.6] w-[109px]">
                    Sub Total
                  </span>
                  <span className="text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]">
                    ₹ {formatNumber(invoiceData?.subTotal ?? 0)}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-sm font-normal opacity-[0.6] w-[109px]">
                    PF Amount
                  </span>
                  <span className="text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]">
                    ₹ {formatNumber(invoiceData?.pfAmount ?? 0)}
                  </span>
                </div>
                {invoiceData?.taxType === "CGST & SGST" && (
                  <div className="flex">
                    <span className="text-sm font-normal opacity-[0.6] w-[109px]">
                      CGST | @ 9% & SGST | @ 9%
                    </span>
                    <span className="text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]">
                      ₹ {formatNumber(invoiceData?.taxGST ?? 0)}
                    </span>
                  </div>
                )}
                {invoiceData?.taxType === "IGST" && (
                  <div className="flex">
                    <span className="text-sm font-normal opacity-[0.6] w-[109px]">
                      IGST | @ 18%
                    </span>
                    <span className="text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]">
                      ₹ 3,000.98
                    </span>
                  </div>
                )}
                <div className="h-[0.5px] bg-secondary-140 w-full "></div>
                <div className="flex ">
                  <span className="text-sm font-[600]  w-[115px]">Total </span>
                  <span className="text-sm font-[600] w-[115px]  ">
                    ₹ {formatNumber(invoiceData?.totalAmount ?? 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col my-[22px]">
            <span className="text-sm font-Inter font-[600]">
              Terms & Conditions
            </span>
            <div className="flex flex-col py-1">
              <span className="text-[rgba(28,28,28,0.4)]  font-sans font-normal text-[14px] leading-[20px]">
                1.Goods once sold will not be taken back under any
                circumstances.
              </span>
              <span className="text-[rgba(28,28,28,0.4)] font-sans font-normal text-[14px] leading-[20px]">
                2.We are not responsible for any loss or damage of goods in
                transit.
              </span>
            </div>
          </div>
          <div
            className={`flex gap-4 justify-end py-[22px]  sticky   bg-white z-10 ${
              isOpen ? " h-56 bottom-4 " : "bottom-0"
            }  `}
          >
            <div className="relative">
              {/* Dropdown Button */}
              <button
                id="dropdownButton"
                type="button"
                className="flex gap-2 justify-center items-center py-2 pr-4 pl-2 border border-secondary-145 rounded-xl text-[16px] font-normal leading-6"
                onClick={handleToggle}
              >
                <span className="w-[186px]">{selectedOption}</span>
                <img src={ICONS.invoicedropdown} alt="dropdown" />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute mt-2 w-full bg-white border border-secondary-145 rounded-xl shadow-lg z-10">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      className={`block w-full text-left px-4 py-2 text-[16px] font-normal hover:bg-secondary-60 rounded-xl ${
                        option === selectedOption
                          ? "bg-secondary-60 font-semibold"
                          : ""
                      }`}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {invoiceData && (
              // <PDFDownloadLink
              //   document={<InvoicePDF invoiceData={invoiceData} />}
              //   fileName="invoice.pdf"
              // >
              <Button
                text="Print"
                onClick={() => {
                  generateInvoicePDF(invoiceData, selectedOption);
                }}
                color="bg-secondary-125 text-[14px] text-white text-xs h-10"
                iconClassName="h-[24px] w-[31px] "
              />
              // </PDFDownloadLink>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
