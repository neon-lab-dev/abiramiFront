/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import {
  createInvoices,
  getClients,
  getInvoiceById,
  updateInvoice,
} from "../../api/api";
import { ICONS } from "../../assets";
import Button from "../../Components/Shared/Button/Button";
import InputField from "../../Components/Shared/InputField/InputField";
import { convertNumberToWords, formatNumber } from "../../utils";
import Loader from "../../lib/loader";
import {
  InvoiceData,
  InvoiceRequest,
  InvoiceResponseWithClient,
  ProductDetail,
} from "../../types/invoice";
import { useNavigate } from "react-router-dom";
import { generateInvoicePDF } from "../../utils/handleInvoice";
import {
  validateBankName,
  validateChequeNumber,
  validateClient,
  validatePONumber,
  validateVehicleNumber,
} from "../../utils/validation";
import { number } from "zod";

const UpdateModal = ({
  editToggleModel,
  selectedId,
  setEditModalOpen,
}: {
  editToggleModel?: (id: string) => void;
  selectedId?: string;
  setEditModalOpen?: (isEditModalOpen: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaveSubmitting, setIsSaveSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [pfPercent, setPfPercent] = useState<number>(10);
  const [pfamount, setPfamount] = useState<number>(0);
  const [subTotalPlusPfAmount, setSubTotalPlusPfAmount] = useState<number>(0);
  useEffect(() => {
    setPfamount(Number(invoiceData?.pfAmount));
  }, [invoiceData]);
  const [taxPercent, setTaxPercent] = useState<number>(18);
  const [tax, setTax] = useState<number>(0);
  const [roundOff, setRoundOff] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options = [
    "Original for Recipient",
    "Duplicate for  Supplier ",
    "Triplicate for Transporter",
    "Extra Copy",
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<InvoiceRequest>({
    clientName: "",
    date: "",
    state: "",
    code: null,
    billingStatus: "",
    invoiceType: "",
    taxType: "",
    subTotal: null,
    pfAmount: null,
    roundOff: null,
    totalAmount: null,
    taxGST: null,
    bankName: "",
    chequeNumber: "",
    chequeAmount: null,
    transport: "",
    placeOfSupply: "",
    poNO: "",
    vehicleNo: "",
    productDetails: [],
  });
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const [rows, setRows] = useState<ProductDetail[]>([
    {
      serialNo: null,
      description: "",
      HSNno: "",
      quantity: null,
      rate: null,
      discount: null,
      amount: null,
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        serialNo: null,
        description: "",
        HSNno: "",
        quantity: null,
        discount: null,
        amount: null,
        rate: null,
      },
    ]);
  };
  const removeRow = (index: number) => {
    setRows(rows.filter((_, idx) => idx !== index));
  };

  const handleInputChange = (
    index: number,
    field: keyof ProductDetail,
    value: string | number // Value from input event is typically string
  ) => {
    setRows((prevRows) =>
      prevRows.map((row, i) => {
        if (i !== index) return row; // Skip rows that are not being edited

        const updatedRow = { ...row }; // Create a copy of the row to modify

        // --- Logic specifically for serialNo ---
        // This block already converts the input value to a number for the serialNo field
        if (field === "serialNo") {
          // Ensure value is treated as string for parseInt
          const stringValue = String(value);
          const parsedInt = parseInt(stringValue, 10);
          // Assign number if parsing is successful, otherwise null
          updatedRow.serialNo = !isNaN(parsedInt) ? parsedInt : null; // Matches `number | null` type
        }
        // --- End of specific serialNo logic ---

        // --- General numeric field handling (excluding serialNo handled above) ---
        else if (["quantity", "rate", "discount", "amount"].includes(field)) {
          // Use parseFloat for potentially decimal numbers, default to 0 if parsing fails
          const parsedValue =
            typeof value === "number" ? value : parseFloat(String(value)) || 0;
          // Assign the parsed numeric value.
          // The 'as never' is often used to bypass strict type checking,
          // but ideally, types should align. Assuming ProductDetail fields match.
          updatedRow[field] = parsedValue as never;
        }
        // --- Handling for other (likely string) fields ---
        else {
          // Assign the value directly (assuming it's intended to be a string)
          // Convert value to string just in case it was passed as a number unexpectedly
          updatedRow[field] = String(value) as never;
        }

        // --- Recalculate amount if relevant fields changed ---
        // This check should ideally happen *after* all fields have been potentially updated
        if (["quantity", "rate", "discount"].includes(field)) {
          const quantity = updatedRow.quantity || 0;
          const rate = updatedRow.rate || 0;
          const discount = updatedRow.discount || 0;
          // Ensure amount is always non-negative and calculated correctly
          updatedRow.amount = Math.abs(quantity * rate * (1 - discount / 100));
        }

        return updatedRow; // Return the modified row
      })
    );
  };

  useEffect(() => {
    const calculateValues = () => {
      // Calculate Subtotal
      const calculatedSubTotal = rows?.reduce((sum, row) => {
        const quantity = row?.quantity || 0;
        const rate = row?.rate || 0;
        const discount = row?.discount || 0;

        const baseAmount = quantity * rate;
        const amount = baseAmount - (baseAmount * discount) / 100;

        return sum + amount;
      }, 0);

      setSubTotal(calculatedSubTotal);

      // ✅ Use pfamount directly here (not subTotalPlusPfAmount state)
      const pfAndTotal = Number(calculatedSubTotal) + Number(pfamount);
      setSubTotalPlusPfAmount(pfAndTotal);

      // ✅ Calculate tax based on pfAndTotal (local value)
      const calculatedTax = (taxPercent / 100) * pfAndTotal;
      setTax(Number(calculatedTax.toFixed(2)));

      // ✅ Calculate Total and Round off
      const calculatedTotal = pfAndTotal + calculatedTax;
      const roundedTotal = Math.round(Number(calculatedTotal));
      setRoundOff(roundedTotal);
      setTotal(roundedTotal);
    };

    calculateValues();
  }, [rows, pfamount, taxPercent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "quantity" ||
        name === "rate" ||
        name === "discount" ||
        name === "amount" ||
        // name === "vehicleNo" ||
        name === "chequeAmount"
          ? Number(value)
          : value,
    }));
  };

  const [clients, setClients] = useState<
    { companyName: string; gstN: string }[]
  >([]);

  // Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const response = await getClients(); // Fetch data from API
        const clientData = response.data.map(
          (client: { companyName: string; GST: string }) => ({
            companyName: client.companyName,
            gstN: client.GST,
          })
        );
        setClients(clientData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const states = [
    { name: "Jammu and Kashmir", code: "01" },
    { name: "Himachal Pradesh", code: "02" },
    { name: "Punjab", code: "03" },
    { name: "Chandigarh", code: "04" },
    { name: "Uttarakhand", code: "05" },
    { name: "Haryana", code: "06" },
    { name: "Delhi", code: "07" },
    { name: "Rajasthan", code: "08" },
    { name: "Uttar Pradesh", code: "09" },
    { name: "Bihar", code: "10" },
    { name: "Sikkim", code: "11" },
    { name: "Arunachal Pradesh", code: "12" },
    { name: "Nagaland", code: "13" },
    { name: "Manipur", code: "14" },
    { name: "Mizoram", code: "15" },
    { name: "Tripura", code: "16" },
    { name: "Meghalaya", code: "17" },
    { name: "Assam", code: "18" },
    { name: "West Bengal", code: "19" },
    { name: "Jharkhand", code: "20" },
    { name: "Odisha", code: "21" },
    { name: "Chhattisgarh", code: "22" },
    { name: "Madhya Pradesh", code: "23" },
    { name: "Gujarat", code: "24" },
    { name: "Dadra and Nagar Haveli and Daman and Diu", code: "26" },
    { name: "Maharashtra", code: "27" },
    { name: "Andhra Pradesh (Before Division)", code: "28" },
    { name: "Karnataka", code: "29" },
    { name: "Goa", code: "30" },
    { name: "Lakshadweep", code: "31" },
    { name: "Kerala", code: "32" },
    { name: "Tamil Nadu", code: "33" },
    { name: "Puducherry", code: "34" },
    { name: "Andaman and Nicobar Islands", code: "35" },
    { name: "Telangana", code: "36" },
    { name: "Andhra Pradesh (Newly Added)", code: "37" },
    { name: "Ladakh (Newly Added)", code: "38" },
    { name: "Other Territory", code: "97" },
    { name: "Centre Jurisdiction", code: "99" },
  ];

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(formData.state.toLowerCase())
  );

  const invoice = [
    { name: "Cash Invoice" },
    { name: "Cheque Invoice" },
    { name: "Tax Invoice" },
    { name: "Quote Invoice" },
  ];

  const status = [
    {
      status: "PAID",
    },
    {
      status: "PENDING",
    },
    {
      status: "DRAFT",
    },
  ];

  const handleStateSelect = (stateName: string, stateCode: string) => {
    setFormData((prev) => ({
      ...prev,
      state: stateName,
      code: Number(stateCode),
      taxType: stateCode === "33" ? "CGST & SGST" : "IGST",
    }));
    setShowDropdown(false);
  };

  const handleStateSelect2 = (Invoicetype: string) => {
    setFormData((prev) => ({
      ...prev,
      invoiceType: Invoicetype,
    }));
    setShowDropdown2(false);
  };

  const handleStateSelect1 = (Status: string) => {
    setFormData((prev) => ({
      ...prev,
      billingStatus: Status,
    }));
    setShowDropdown1(false);
  };

  const handleSubmit = async () => {
    const data = {
      clientName: formData.clientName,
      date: formData.date,
      state: formData.state,
      code: formData.code,
      billingStatus: formData.billingStatus,
      invoiceType: formData.invoiceType,
      totalAmount: total,
      taxGST: tax,
      bankName: formData.bankName,
      chequeNumber: formData.chequeNumber || 0 || "",
      chequeAmount: Number(formData.chequeAmount) || 0,
      transport: formData.transport,
      placeOfSupply: formData.placeOfSupply,
      poNO: String(formData.poNO) || "",
      vehicleNo: String(formData.vehicleNo) || "",
      taxType: formData.taxType,
      subTotal: subTotal,
      pfAmount: Number(pfamount),
      roundOff: roundOff,
      productDetails: rows,
    };
    setIsSaving(true);
    // setLoading(true);

    try {
      if (selectedId) {
        const response = await updateInvoice(selectedId, data);
        setEditModalOpen && setEditModalOpen(false);

        alert("Data updated successfully!!");
        navigate(0);
      } else {
        alert("Failed to update invoice. No selected ID provided.");
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Failed to update invoice. Please try again.");
    } finally {
      setIsSaving(false);
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (formData.invoiceType.toLowerCase() == "cash invoice") {
      setFormData({
        ...formData,
        chequeNumber: "",
        chequeAmount: null,
        bankName: "",
        transport: "",
        placeOfSupply: "",
        poNO: "",
        vehicleNo: "",
      });
    }
    if (formData.invoiceType.toLowerCase() != "cheque invoice") {
      setFormData({
        ...formData,
        chequeNumber: "",
        chequeAmount: null,
        bankName: "",
      });
    }
    if (formData.invoiceType.toLowerCase() != "tax invoice") {
      setFormData({
        ...formData,
        transport: "",
        placeOfSupply: "",
        poNO: "",
        vehicleNo: "",
      });
    }
    if (formData.invoiceType.toLowerCase() == "quote invoice") {
      setFormData({
        ...formData,
        chequeNumber: "",
        chequeAmount: null,
        bankName: "",
        transport: "",
        placeOfSupply: "",
        poNO: "",
        vehicleNo: "",
      });
    }
  }, []);

  //   Fetch invoice by id
  useEffect(() => {
    const fetchInvoiceById = async () => {
      setLoading(true);
      try {
        if (selectedId) {
          const data: InvoiceResponseWithClient = await getInvoiceById(
            selectedId
          );
          setInvoiceData(data?.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceById();
  }, [selectedId]);

  useEffect(() => {
    // Assuming `data` is fetched or passed as a prop
    if (invoiceData) {
      setFormData({
        clientName: invoiceData.clientName || "",
        date: invoiceData.date || "",
        state: invoiceData.state || "",
        taxType: invoiceData.taxType || "",
        invoiceType: invoiceData.invoiceType || "",
        chequeNumber: invoiceData.chequeNumber || "",
        chequeAmount: invoiceData.chequeAmount || null,
        bankName: invoiceData.bankName || "",
        code: invoiceData.code || 0,
        billingStatus: invoiceData.billingStatus || "",
        transport: invoiceData.transport || "",
        placeOfSupply: invoiceData.placeOfSupply || "",
        poNO: invoiceData.poNO || "",
        vehicleNo: invoiceData.vehicleNo || "",
        subTotal: invoiceData.subTotal || 0,
        pfAmount: invoiceData.pfAmount || 0,
        roundOff: invoiceData.roundOff || 0,
        taxGST: invoiceData.taxGST || 0,
        totalAmount: invoiceData.totalAmount || 0,
        productDetails: invoiceData.productDetails || [],
      });
      setRows(
        invoiceData.productDetails.map((product: ProductDetail) => ({
          serialNo: product.serialNo,
          id: product.id || "",
          description: product.description || "",
          HSNno: product.HSNno.toString() || "",
          quantity: product.quantity || 0,
          rate: product.rate || 0,
          discount: product.discount || 0,
          amount: product.amount || 0,
        }))
      );
    }
  }, [invoiceData]);

  const rowsData = rows?.map((row) => {
    return {
      description: row.description,
      HSNno: row.HSNno,
      quantity: row.quantity,
      rate: row.rate,
      discount: row.discount,
      amount: row.amount,
    };
  });

  console.log(invoiceData);

  const handleSavePrint = async () => {
    const data = {
      clientName: formData.clientName,
      date: formData.date,
      state: formData.state,
      code: formData.code,
      billingStatus: formData.billingStatus,
      invoiceType: formData.invoiceType,
      totalAmount: total,
      taxGST: tax,
      bankName: formData.bankName,
      chequeNumber: formData.chequeNumber || 0 || "",
      chequeAmount: Number(formData.chequeAmount) || 0,
      transport: formData.transport,
      placeOfSupply: formData.placeOfSupply,
      poNO: String(formData.poNO) || "",
      vehicleNo: String(formData.vehicleNo) || "",
      taxType: formData.taxType,
      subTotal: subTotal,
      pfAmount: Number(pfamount),
      roundOff: roundOff,
      productDetails: rows,
    };
    setIsSaveSubmitting(true);
    // setIsSubmitting(true);
    try {
      if (selectedId) {
        const response = await updateInvoice(selectedId, data);
        const invoiceData = await getInvoiceById(selectedId);
        const pdfData = invoiceData.data;

        generateInvoicePDF(pdfData, selectedOption);
        console.log(pdfData);
      } else {
        alert("Failed to update invoice. No selected ID provided.");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Failed to create invoice. Please try again.");
    } finally {
      setIsSaveSubmitting(false);
      // setIsSubmitting(false);
      navigate("/invoices");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-6 w-[70%] h-[550px] shadow-lg overflow-y-scroll custom-scrollbar scroll-none">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="flex justify-between pb-4 ">
              <span className="text-sm font-Inter font-[600] ">
                Billing Details
              </span>
              <img
                src={ICONS.close}
                alt=""
                onClick={() => editToggleModel && editToggleModel("")}
                className=" cursor-pointer"
              />
            </div>
            <div className="w-full  pb-[44px] pt-[22px]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
              <InputField
                label="Client"
                required={true}
                inputBg=""
                type="text"
                placeholder="Enter Client name"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                validate={(value) => validateClient(value, clients)}
              />

              <InputField
                label="Date"
                required={true}
                inputBg=""
                type="date"
                placeholder="dd/mm/yyyy"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <div className=" flex gap-1">
                <div className="flex-2 relative" ref={dropdownRef}>
                  <div className="" onClick={() => setShowDropdown(true)}>
                    <InputField
                      label="State & Code"
                      required={true}
                      inputBg=""
                      type="text"
                      icon={ICONS.invoicesearch}
                      placeholder="Search"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                  {showDropdown && (
                    <div className="absolute bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto w-full mt-1 z-10">
                      {filteredStates.length > 0 ? (
                        filteredStates.map((state) => (
                          <div
                            key={state.code}
                            className="px-4 py-2 cursor-pointer hover:bg-secondary-150 hover:text-white"
                            onClick={() =>
                              handleStateSelect(state.name, state.code)
                            }
                          >
                            {state.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500">
                          No results found
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-end pb-[2px] flex-1">
                  <InputField
                    label=""
                    inputBg=""
                    type="number"
                    placeholder="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex-2 relative" ref={dropdownRef}>
                <div className="" onClick={() => setShowDropdown1(true)}>
                  <InputField
                    label="Status"
                    required={true}
                    inputBg=""
                    type="text"
                    icon={ICONS.downArrow2}
                    placeholder="Search"
                    name="billingStatus"
                    value={formData.billingStatus}
                    onChange={handleChange}
                  />
                </div>
                {showDropdown1 && (
                  <div className="absolute bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto scroll-none w-full mt-1 z-10">
                    {status.map((status) => (
                      <div
                        key={status.status}
                        className="px-4 py-2 cursor-pointer hover:bg-secondary-150 hover:text-white"
                        onClick={() => handleStateSelect1(status.status)}
                      >
                        {status.status}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <InputField
                label="Tax Type"
                required={true}
                inputBg=""
                type="text"
                placeholder="Enter Tax type"
                name="taxType"
                value={formData.taxType}
                readOnly={true}
              />

              <div className="flex-2 relative" ref={dropdownRef}>
                <div className="" onClick={() => setShowDropdown2(true)}>
                  <InputField
                    label="Invoice Type"
                    required={true}
                    inputBg=""
                    type="text"
                    icon={ICONS.downArrow2}
                    placeholder="Search"
                    name="invoiceType"
                    value={formData.invoiceType}
                    onChange={handleChange}
                  />
                </div>
                {showDropdown2 && (
                  <div className="absolute bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto scroll-none w-full mt-1 z-10">
                    {invoice.map((invoice) => (
                      <div
                        key={invoice.name}
                        className="px-4 py-2 cursor-pointer hover:bg-secondary-150 hover:text-white"
                        onClick={() => handleStateSelect2(invoice.name)}
                      >
                        {invoice.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {formData.invoiceType.toLocaleLowerCase() == "cheque invoice" && (
                <>
                  <InputField
                    label="Bank Name"
                    required={true}
                    inputBg=""
                    type="text"
                    placeholder="Enter bank name"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    validate={validateBankName}
                  />
                  <InputField
                    label="Cheque Number"
                    required={true}
                    inputBg=""
                    type="text"
                    placeholder="Enter Cheque Number"
                    name="chequeNumber"
                    value={formData.chequeNumber}
                    onChange={handleChange}
                    validate={validateChequeNumber}
                  />
                  <InputField
                    label="Cheque Amount"
                    required={true}
                    inputBg=""
                    type="number"
                    placeholder="Enter amount"
                    name="chequeAmount"
                    value={formData.chequeAmount}
                    onChange={handleChange}
                  />
                </>
              )}

              {formData.invoiceType.toLowerCase() == "tax invoice" && (
                <>
                  <InputField
                    label="Transport"
                    required={true}
                    inputBg=""
                    type="text"
                    placeholder="Enter Transport"
                    name="transport"
                    value={formData.transport}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Place of Supply"
                    required={true}
                    inputBg=""
                    type="text"
                    placeholder="Enter Place of Supply"
                    name="placeOfSupply"
                    value={formData.placeOfSupply}
                    onChange={handleChange}
                  />
                  <InputField
                    label="P.O.No"
                    inputBg=""
                    type="text"
                    placeholder="Enter P.O.No"
                    name="poNO"
                    value={formData.poNO}
                    onChange={handleChange}
                    validate={validatePONumber}
                  />
                  <InputField
                    label="Vehicle Number"
                    inputBg=""
                    type="text"
                    placeholder=" Enter Vehicle Number"
                    name="vehicleNo"
                    value={formData.vehicleNo}
                    onChange={handleChange}
                    // validate={validateVehicleNumber}
                  />{" "}
                </>
              )}
            </div>
            <span className="text-sm font-Inter font-[600] ">
              Product Details
            </span>
            <div className="mt-[22px]">
              <Button
                text="Add Product(s)"
                imgSrc={ICONS.invoiceplus}
                color="bg-secondary-120 text-[14px] text-secondary-125"
                iconClassName="h-[24px] w-[24px]"
                onClick={addRow}
              />
            </div>

            {/* item description */}

            <div className="bg-secondary-60 rounded-lg shadow-lg  w-full p-6 mt-6">
              <h2 className="text-sm font-[600] mb-4">Item Description</h2>

              {/* Table - Responsive Layout */}
              <div className="overflow-x-auto">
                <table className="w-full border-hidden lg:table hidden">
                  <thead>
                    <tr className="text-sm font-normal leading-5 font-inter text-neutral-5 opacity-[0.6]">
                      <th className=" px-4 py-2 text-left">S.No.</th>
                      <th className=" px-4 py-2 text-left">Description</th>
                      <th className=" px-4 py-2 text-left">HSN No.</th>
                      <th className=" px-4 py-2 text-left">Quantity</th>
                      <th className=" px-4 py-2 text-left">Rate</th>
                      <th className=" px-4 py-2 text-left">Discount</th>
                      <th className=" px-4 py-2 text-left">Amount</th>
                      <th className=" px-4 py-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {rows?.map((row, index) => (
                      <tr>
                        <td className=" px-4 py-2 text-center text-sm font-normal leading-5 font-inter text-neutral-5 opacity-[0.6]">
                          <input
                            type="number"
                            placeholder="Sr. no"
                            value={row.serialNo ?? ""}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "serialNo",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border border-secondary-145 rounded mt-1"
                          />
                        </td>
                        <td className=" px-4 py-2">
                          <input
                            type="text"
                            placeholder="Enter Description"
                            value={row.description}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border border-secondary-145 rounded"
                          />
                        </td>
                        <td className=" px-4 py-2">
                          <input
                            type="text"
                            placeholder="Enter HSN No."
                            value={row.HSNno}
                            onChange={(e) =>
                              handleInputChange(index, "HSNno", e.target.value)
                            }
                            className="w-full p-1  border border-secondary-145 rounded"
                          />
                        </td>
                        <td className=" px-4 py-2">
                          <input
                            type="number"
                            placeholder="Enter quantity"
                            value={row.quantity ?? ""}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border border-secondary-145  rounded"
                          />
                        </td>
                        <td className=" px-4 py-2">
                          <input
                            type="number"
                            placeholder="Enter rate"
                            value={row.rate ?? ""}
                            onChange={(e) =>
                              handleInputChange(index, "rate", e.target.value)
                            }
                            className="w-full p-1 border border-secondary-145 rounded"
                          />
                        </td>
                        <td className=" px-4 py-2">
                          <input
                            type="number"
                            placeholder="Enter discount"
                            // min={0}
                            // max={1}
                            value={row.discount ?? ""}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "discount",
                                e.target.value
                              )
                            }
                            className="w-full p-1 border border-secondary-145 rounded"
                          />
                        </td>
                        <td className=" px-4 py-2">
                          <input
                            type="number"
                            placeholder="Enter amount"
                            value={row?.amount ?? ""}
                            onChange={(e) =>
                              handleInputChange(index, "amount", e.target.value)
                            }
                            className="w-full p-1 border border-secondary-145 rounded"
                          />
                        </td>
                        <td className=" px-4 py-2 text-center text-red-500 cursor-pointer">
                          <Button
                            text=""
                            imgSrc={ICONS.invoicedelete}
                            color=""
                            iconClassName="h-[24px] w-[24px]"
                            onClick={() => removeRow(index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Responsive (Mobile View) */}

                <div className="lg:hidden grid gap-4">
                  {rows?.map((row, index) => (
                    <>
                      <div className="flex items-center justify-between">
                        <input
                          type="number"
                          placeholder="Sr. no"
                          value={row.serialNo ?? ""}
                          onChange={(e) =>
                            handleInputChange(index, "serialNo", e.target.value)
                          }
                          className="w-full p-2 border border-secondary-145 rounded mt-1"
                        />
                        <Button
                          text=""
                          imgSrc={ICONS.invoicedelete}
                          color=""
                          iconClassName="h-[24px] w-[24px]"
                        />
                      </div>
                      <div>
                        <label>Description</label>
                        <input
                          type="text"
                          placeholder="Enter Description"
                          value={row.description}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-secondary-145 rounded mt-1"
                        />
                      </div>
                      <div>
                        <label>HSN No.</label>
                        <input
                          type="text"
                          placeholder="Enter HSN No."
                          value={row.HSNno}
                          onChange={(e) =>
                            handleInputChange(index, "HSNno", e.target.value)
                          }
                          className="w-full p-2 border border-secondary-145 rounded mt-1"
                        />
                      </div>
                      <div>
                        <label>Quantity</label>
                        <input
                          type="number"
                          placeholder="Enter quantity"
                          value={row.quantity ?? ""}
                          onChange={(e) =>
                            handleInputChange(index, "quantity", e.target.value)
                          }
                          className="w-full p-2 border border-secondary-145 rounded mt-1"
                        />
                      </div>
                      <div>
                        <label>Rate</label>
                        <input
                          type="number"
                          placeholder="Enter rate"
                          value={row.rate ?? ""}
                          onChange={(e) =>
                            handleInputChange(index, "rate", e.target.value)
                          }
                          className="w-full p-2 border border-secondary-145 rounded mt-1"
                        />
                      </div>
                      <div>
                        <label>Discount</label>
                        <input
                          type="number"
                          placeholder="Enter discount"
                          min={0}
                          step={0.01}
                          max={1}
                          value={row.discount ?? ""}
                          onChange={(e) =>
                            handleInputChange(index, "discount", e.target.value)
                          }
                          className="w-full p-2 border border-secondary-145 rounded mt-1"
                        />
                      </div>
                      <div>
                        <label>Amount</label>
                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={row.amount ?? ""}
                          onChange={(e) =>
                            handleInputChange(index, "amount", e.target.value)
                          }
                          className="w-full p-2 border border-secondary-145 rounded mt-1"
                        />
                      </div>
                    </>
                  ))}
                </div>
              </div>

              {/* Bank Details and Totals */}
              <div className="flex justify-between max-md:flex-col-reverse gap-8 mt-6">
                <div className="flex items-end justify-between gap-8 w-[66%] max-md:flex-col-reverse">
                  <div className=" max-lg:gap-2">
                    <h3 className="text-sm font-[600] mb-4">Bank details</h3>
                    <div className="flex gap-2">
                      <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                        Bank Name
                      </span>
                      <span className="font-inter text-[12px] font-normal leading-[18px] ">
                        State Bank of India
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                        Account Number
                      </span>
                      <span className="font-inter text-[12px] font-normal leading-[18px] ">
                        xxxx 98
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                        IFSC
                      </span>
                      <span className="font-inter text-[12px] font-normal leading-[18px] ">
                        SBIN0098763
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-neutral-5 opacity-[0.5] font-inter text-[12px] font-normal leading-[18px] w-[100px] ">
                        Branch{" "}
                      </span>
                      <span className="font-inter text-[12px] font-normal leading-[18px] ">
                        Avinashi Road, Coimbatore-37
                      </span>
                    </div>
                  </div>

                  {/* Total in Words */}
                  <div className="mt-4 ">
                    <h3 className="text-sm font-normal leading-5 font-inter text-neutral-5 opacity-[0.6] mb-6">
                      Total (in words)
                    </h3>
                    <p className="text-sm leading-5 font-inter font-[600]">
                      {convertNumberToWords(total ?? 0)}
                    </p>
                  </div>
                </div>

                <div className="w-[314px] ">
                  <div className="flex justify-between items-center  py-2">
                    <span className="text-neutral-5 opacity-[0.5] font-inter text-[14px] font-normal ">
                      Sub Total
                    </span>
                    <div className="w-[111px]">
                      <InputField
                        label=""
                        inputBg="bg-white w-full "
                        type="text"
                        placeholder="₹ 0"
                        name=""
                        onChange={handleChange}
                        value={subTotal}
                        readOnly
                      />
                    </div>
                  </div>
                  {/* <div className="flex justify-between items-center  py-2">
                <span className="text-neutral-5 opacity-[0.5] font-inter text-[14px] font-normal ">
                  Discount
                </span>
                <div className="w-[111px]">
                  <InputField
                    label=""
                    inputBg="bg-white w-full "
                    type="text"
                    placeholder="₹ 0"
                    name=""
                    onChange={handleChange}
                  />
                </div>
              </div> */}
                  <div className="flex justify-between items-center  py-2">
                    <span className="text-neutral-5 opacity-[0.5] font-inter text-[14px] font-normal ">
                      PF Amount
                    </span>
                    <div className="w-[111px]">
                      <InputField
                        label=""
                        inputBg="bg-white w-full "
                        type="text"
                        placeholder="₹ 0"
                        value={pfamount}
                        name=""
                        onChange={(e) => setPfamount(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center  py-2">
                    <span className="text-neutral-5 opacity-[0.5] font-inter text-[14px] font-normal ">
                      {formData.code?.toString() === "33"
                        ? "Tax | CGST @ 9% & SGST @ 9%"
                        : " Tax | IGST @ 18%"}
                    </span>
                    <div className="w-[111px]">
                      <InputField
                        label=""
                        inputBg="bg-white w-full "
                        type="text"
                        placeholder="₹ 0"
                        name=""
                        value={tax}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center  py-2">
                    <span className="text-neutral-5 opacity-[0.5] font-inter text-[14px] font-normal ">
                      Round Off
                    </span>
                    <div className="w-[111px]">
                      <InputField
                        label=""
                        inputBg="bg-white w-full "
                        type="text"
                        placeholder="₹ 0"
                        name=""
                        value={roundOff}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-8">
                    <span className="text-sm font-[600]">Total</span>
                    <span className="text-sm font-[600]">
                      ₹ {formatNumber(total ?? 0)}
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
            <div className=" border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed my-[22px]"></div>

            {/* Buttons */}
            <div className="col-span-3 flex justify-end gap-4 my-8">
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
              <Button
                onClick={handleSubmit}
                text={isSaving ? "Submitting..." : "Save"}
                type="reset"
                color="text-primary-10 bg-none"
              />
              <Button
                onClick={handleSavePrint}
                text={isSaveSubmitting ? "Submitting..." : "Save & Print"}
                type="submit"
                color="bg-primary-10 text-white"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateModal;
