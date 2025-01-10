import { useState } from "react";
import InvoiceListCard from "../../Components/Reusable/InvoiceListCard/InvoiceListCard";
import Button from "../../Components/Shared/Button/Button";
import { ICONS } from "../../assets";
import { useNavigate } from "react-router-dom";

const DetailPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const options = [
    "Original for Recipient",
    "Duplicate for Transporter",
    "Triplicate for Supplier",
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const navigate = useNavigate();
  const handleOptionSelect = (option:string) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown
  };
  const handlenavigatetocreateinvoices = () => {
    navigate("/Invoices/CreateInvoices");
  };
  const tableHeaders = [
    "S.No",
    "Description",
    "HSN No.",
    "Quality",
    "Rate",
    "Discount",
    "Amount",
  ];
 

  const rows = [
    {
      id: 1,
      description: "Apollo Electrical Services",
      code: "HSGFFD7564",
      quantity: "1,00,000",
      rate: "₹ 75.00",
      tax: "₹ 10,075.00",
      total: "₹ 75,00,000.00",
    },
    {
      id: 2,
      description: "Beta Plumbing Co.",
      code: "BETA5678",
      quantity: "50,000",
      rate: "₹ 50.00",
      tax: "₹ 5,000.00",
      total: "₹ 25,00,000.00",
    },
    // Add more rows as needed
  ];

  return (
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

      <div className="flex gap-7 max-md:flex-col">
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

        <InvoiceListCard
          subtitle={"To"}
          title={"AJK Pumps"}
          location={
            "1052, Bharathpur road, PN Palayam, Coimbatore, Address line 2"
          }
          cardNo={"33ACVPC901G1ZS"}
          phone={"+91 99986 98765, 04321 987651"}
          email={"+91 99986 98765, 04321 987651"}
        />
        {/* billing info */}
        <div className="bg-secondary-60 opacity-75 w-[416px] p-6 flex flex-col rounded-2xl max-md:w-full">
          <span className="font-sans text-xs font-normal leading-4 ">
            Billing Details
          </span>
          <div className="flex gap-3 items-center mt-[31px]">
            <span className="w-[118px] px-1 font-sans text-xs font-normal leading-[15px]">
              Invoice ID
            </span>
            <div className="flex gap-2.5 items-center">
              <span className="font-sans text-xs font-[600] leading-[15px]">
                1123434444
              </span>
              <span className="p-1 border border-secondary-130 rounded-[2px] custom-gradient bg-secondary-35 text-[10px] text-secondary-75 w-[53px] h-[15px] flex items-center ">
                PENDING
              </span>
            </div>
          </div>
          <div className="flex gap-3 items-center mt-2">
            <span className="w-[118px] px-1 font-sans text-xs font-normal leading-[15px]">
              Invoice Type
            </span>
            <span className="font-sans text-xs font-[600] leading-[15px]">
              Cash Invoice
            </span>
          </div>
          <div className="flex gap-3 items-center mt-2">
            <span className="w-[118px] px-1 font-sans text-xs font-normal leading-[15px]">
              Tax Type
            </span>
            <span className="font-sans text-xs font-[600] leading-[15px]">
              CGST & SGST
            </span>
          </div>
          <div className="flex gap-3 items-center mt-2">
            <span className="w-[118px] px-1 font-sans text-xs font-normal leading-[15px]">
              Created Date
            </span>
            <span className="font-sans text-xs font-[600] leading-[15px]">
              10 September, 2024
            </span>
          </div>
          <div className="flex gap-3 items-center mt-2">
            <span className="w-[118px] px-1 font-sans text-xs font-normal leading-[15px]">
              State & Code
            </span>
            <div className="flex gap-2 items-center">
              <span className="font-sans text-xs font-[600] leading-[15px]">
                Tamil Nadu
              </span>
              <span className="p-2 rounded-[2px] custom-gradient bg-secondary-135 text-[10px] w-[21px] h-[15px] flex items-center justify-center ">
                32
              </span>
            </div>
          </div>
        </div>
      </div>

      (
    <div className="bg-secondary-60 opacity-75 w-full p-6 flex flex-col rounded-2xl my-[22px]">
      <span className="font-Inter font-[600] text-sm">Item Description</span>

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
            {rows.map((row) => (
              <tr
                key={row.id}
                className="bg-white rounded-[16px] "
              >
                <td className="px-4 py-3 text-sm font-normal">{row.id}</td>
                <td className="px-4 py-3 text-sm font-normal">
                  {row.description}
                </td>
                <td className="px-4 py-3 text-sm font-normal">{row.code}</td>
                <td className="px-4 py-3 text-sm font-normal">
                  {row.quantity}
                </td>
                <td className="px-4 py-3 text-sm font-normal">{row.rate}</td>
                <td className="px-4 py-3 text-sm font-normal">{row.tax}</td>
                <td className="px-4 py-3 text-sm font-normal">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="flex mt-[24px] gap-6 max-md:flex-col-reverse">
          <div className="flex  justify-end items-end w-[100%] max-md:justify-start">
            <div className="flex flex-col">
              <span className="text-sm opacity-[0.6]">Total (in words)</span>
              <div className="h-[0.5px] bg-secondary-140 w-full my-3"></div>
              <span className="text-sm font-[600]">
                Seventy five lakhs and three thousand
              </span>
            </div>
          </div>
          <div className="flex flex-col px-6 gap-3 ">
            <div className="flex">
              <span className="text-sm font-normal opacity-[0.6] w-[109px]">
                Sub Total
              </span>
              <span className="text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]">
                ₹ 75,00,000.00
              </span>
            </div>
            <div className="flex">
              <span className="text-sm font-normal opacity-[0.6] w-[109px]">
                PF Amount
              </span>
              <span className="text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]">
                ₹ 0
              </span>
            </div>
            <div className="flex">
              <span className="text-sm font-normal opacity-[0.6] w-[109px]">
                CGST | @ 9%
              </span>
              <span className="text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]">
                ₹ 0
              </span>
            </div>
            <div className="flex">
              <span className="text-sm font-normal opacity-[0.6] w-[109px]">
                SGST | @ 9%
              </span>
              <span className="text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]">
                ₹ 0
              </span>
            </div>
            <div className="flex">
              <span className="text-sm font-normal opacity-[0.6] w-[109px]">
                IGST | @ 18%
              </span>
              <span className="text-right font-sans font-medium text-[12px] leading-[1.32] tracking-[0.06px] w-[109px]">
                ₹ 3,000.98
              </span>
            </div>
            <div className="h-[0.5px] bg-secondary-140 w-full "></div>
            <div className="flex ">
              <span className="text-sm font-[600]  w-[115px]">Total </span>
              <span className="text-sm font-[600] w-[115px]  ">
                ₹ 75,03,000.00
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex gap-4 justify-end py-[22px]  sticky   bg-white z-10 ${isOpen?" h-52 bottom-4 ":"bottom-0"}  `}>
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
                option === selectedOption ? "bg-secondary-60 font-semibold" : ""
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
        <Button
          text="Print"
          color="bg-secondary-125 text-[14px] text-white text-xs h-10"
          iconClassName="h-[24px] w-[31px] "
        />
      </div>
    </div>
  );
};

export default DetailPage;
