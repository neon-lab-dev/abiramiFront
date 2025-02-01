import { formatNumber } from "chart.js/helpers";
import React, { useEffect, useRef, useState } from "react";
import { getInvoiceById, updateInvoice } from "../../api/api";
import { ICONS } from "../../assets";
import Button from "../../Components/Shared/Button/Button";
import InputField from "../../Components/Shared/InputField/InputField";
import { convertNumberToWords } from "../../utils";
import Loader from "../../lib/loader";
import { InvoiceRequest, ProductDetail } from "../../types/invoice";
import { useNavigate } from "react-router-dom";

const UpdateModal = ({
  editToggleModel,
  selectedId,
}: {
  editToggleModel: () => void;
  selectedId: string;
}) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subTotal, setSubTotal] = useState<number>();
  const [pfPercent, setPfPercent] = useState<number>(10);
  const [pfamount, setPfamount] = useState<number>();
  const [taxPercent, setTaxPercent] = useState<number>(18);
  const [tax, setTax] = useState<number>();
  const [roundOff, setRoundOff] = useState<number>();
  const [total, setTotal] = useState<number>();
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    poNO: null,
    vehicleNo: null,
    productDetails: [],
  });
  const [rows, setRows] = useState([
    {
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
        description: "",
        HSNno: "",
        quantity: "",
        rate: "",
        discount: "",
        amount: "",
      },
    ]);
  };
  const removeRow = (index: number) => {
    setRows(rows.filter((_, idx) => idx !== index));
  };
  const handleInputChange = (
    index: number,
    field: string,
    value: number | string
  ) => {
    const updatedRows: any[] = [...rows];
    if (["quantity", "rate", "discount", "amount"].includes(field)) {
      updatedRows[index][field] = parseFloat(value) || 0;
    } else {
      updatedRows[index][field] = value;
    }

    // Automatically calculate the amount if relevant fields are updated
    if (["quantity", "rate", "discount"].includes(field)) {
      const quantity = updatedRows[index].quantity || 0;
      const rate = updatedRows[index].rate || 0;
      const discount = updatedRows[index].discount || 0;

      updatedRows[index].amount = quantity * rate * (1 - discount);
    }
    console.log(updatedRows);
    setRows(updatedRows);
  };
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
        name === "chequeAmount"
          ? Number(value)
          : value,
    }));
  };

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

  const invoice = [
    { name: "Cash Invoice" },
    { name: "Cheque Invoice" },
    { name: "Tax Invoice" },
    { name: "Quote Invoice" },
  ];
  const status = [
    {
      status: "Paid",
    },
    {
      status: "Pending",
    },
    {
      status: "Draft/Performa Invoice",
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
      chequeNumber: formData.chequeNumber,
      chequeAmount: formData.chequeAmount,
      transport: formData.transport,
      placeOfSupply: formData.placeOfSupply,
      poNO: formData.poNO,
      vehicleNo: formData.vehicleNo,
      taxType: formData.taxType,
      subTotal: subTotal,
      pfAmount: pfamount,
      roundOff: roundOff,
      productDetails: rows,
    };
    setIsSubmitting(true);
    setLoading(true);
    try {
      const response = await updateInvoice(selectedId, data);
      console.log("Invoice updated successfully:", response.data);
      alert("Invoice updated successfully!");
    } catch (error) {
      console.error("Error updating invoice:", error);
      alert("Failed to update invoice. Please try again.");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
      navigate(0);
    }
  };

  useEffect(() => {
    const calculateValues = () => {
      // Calculate Subtotal
      const calculatedSubTotal = rows?.reduce((sum, row) => {
        const quantity = parseFloat(row?.quantity?.toString()) || null;
        const rate = parseFloat(row?.rate?.toString()) || null;
        const discount = parseFloat(row?.discount?.toString()) || null;
        const amount = (quantity || 0) * (rate || 0) * (1 - (discount || 0));
        return sum + amount;
      }, 0);

      setSubTotal(calculatedSubTotal);

      // Calculate PF Amount (e.g., 10% of Subtotal)
      const calculatedPfAmount = (pfPercent / 100) * calculatedSubTotal;
      setPfamount(Number(calculatedPfAmount.toFixed(2)));

      // Calculate Tax (e.g., 18% of Subtotal)
      const calculatedTax = (taxPercent / 100) * calculatedSubTotal;
      setTax(Number(calculatedTax.toFixed(2)));

      // Calculate Total
      const calculatedTotal =
        calculatedSubTotal + calculatedPfAmount + calculatedTax;
      const roundedTotal = Math.round(calculatedTotal);
      setRoundOff(roundedTotal);
      setTotal(roundedTotal);
    };
    calculateValues();
  }, [rows]);

  useEffect(() => {
    if (formData.invoiceType.toLowerCase() == "cash invoice") {
      setFormData({
        ...formData,
        chequeNumber: "",
        chequeAmount: null,
        bankName: "",
        transport: "",
        placeOfSupply: "",
        poNO: null,
        vehicleNo: null,
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
        poNO: null,
        vehicleNo: null,
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
        poNO: null,
        vehicleNo: null,
      });
    }
  }, []);

  //   Fetch invoice by id
  useEffect(() => {
    const fetchInvoiceById = async () => {
      setLoading(true);
      try {
        const data: any[] = await getInvoiceById(selectedId);
        setInvoiceData(data.data);
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
        poNO: invoiceData.poNO || null,
        vehicleNo: invoiceData.vehicleNo || null,
        subTotal: invoiceData.subTotal || 0,
        pfAmount: invoiceData.pfAmount || 0,
        roundOff: invoiceData.roundOff || 0,
        taxGST: invoiceData.taxGST || 0,
        totalAmount: invoiceData.totalAmount || 0,
        productDetails: invoiceData.productDetails || [],
      });
      setRows(
        invoiceData.productDetails.map((product: ProductDetail) => ({
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

  console.log(formData);

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
                onClick={editToggleModel}
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
                    <div className="absolute bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto scroll-none w-full mt-1 z-10">
                      {states.map((state) => (
                        <div
                          key={state.code}
                          className="px-4 py-2 cursor-pointer hover:bg-secondary-150 hover:text-white"
                          onClick={() =>
                            handleStateSelect(state.name, state.code)
                          }
                        >
                          {state.name}
                        </div>
                      ))}
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

              {/* <InputField
            label="Status"
            required={true}
            inputBg=""
            type="text"
            placeholder="Enter Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          /> */}
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
                  />
                  <InputField
                    label="Cheque Number"
                    required={true}
                    inputBg=""
                    type="string"
                    placeholder="Enter Cheque Number"
                    name="chequeNumber"
                    value={formData.chequeNumber}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Cheque Amount"
                    required={true}
                    inputBg=""
                    type="string"
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
                    required={true}
                    inputBg=""
                    type="number"
                    placeholder="Enter P.O.No"
                    name="poNo"
                    value={formData.poNO}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Vehicle Number"
                    required={true}
                    inputBg=""
                    type="string"
                    placeholder=" Enter Vehicle Number"
                    name="vehicleNo"
                    value={formData.vehicleNo}
                    onChange={handleChange}
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
                          {index + 1}
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
                            value={row.quantity}
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
                            value={row.rate}
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
                            value={row.discount}
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
                            value={row?.amount}
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
                        <span>S. No: {index + 1}</span>
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
                          value={row.quantity}
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
                          value={row.rate}
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
                          value={row.discount}
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
                          value={row.amount}
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
                      {convertNumberToWords(total)}
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
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center  py-2">
                    <span className="text-neutral-5 opacity-[0.5] font-inter text-[14px] font-normal ">
                      {formData.Code == "33"
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
                      ₹ {formatNumber(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col my-[22px]">
              <span className="text-sm font-Inter font-[600]">
                Terms & Conditions
              </span>
              <span className="text-sm font-Inter font-normal mt-[22px]">
                Notes
              </span>
              <div className="flex flex-col py-1">
                <span className="text-[rgba(28,28,28,0.4)]  font-sans font-normal text-[14px] leading-[20px]">
                  1.some notes goes here
                </span>
                <span className="text-[rgba(28,28,28,0.4)] font-sans font-normal text-[14px] leading-[20px]">
                  2.some notes goes here
                </span>
              </div>
            </div>
            <div className=" border-[0.5px] opacity-[0.5] border-secondary-110 border-dashed my-[22px]"></div>

            {/* Buttons */}
            <div className="col-span-3 flex justify-end gap-4 my-8">
              <Button
                onClick={handleSubmit}
                text="Save"
                type="reset"
                color="text-primary-10 bg-none"
              />
              <Button
                text="Save & Print"
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
