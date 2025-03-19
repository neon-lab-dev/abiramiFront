// Validate GST Number  15 alphanumeric characters
export const validateGST = (value: string): string | null => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[0-9A-Z]{1}[0-9A-Z]{1}$/;
  return gstRegex.test(value) ? null : "Invalid GST Number format";
};

// Validate Phone Number 10-digit numeric value
export const validatePhoneNumber = (value: string): string | null => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(value) ? null : "Invalid phone number format";
};

// Validate Email Address
export const validateEmail = (value: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? null : "Invalid email format";
};

// Validate Telephone Number
export const validateTelephone = (value: string): string | null => {
  const telRegex = /^\+?[0-9]{1,4}?[-.\s]?[0-9]{6,12}$/;
  return telRegex.test(value) ? null : "Invalid telephone number format";
};

// Validate Pincode (India) - 6-digit numeric value
export const validatePincode = (value: string): string | null => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(value) ? null : "Invalid pincode format";
  };

// Validate if the entered client exists in the API response
export const validateClient = (
  value: string,
  clientList: { companyName: string; gstN: string }[]
): string | null => {
  const clientExists = clientList.some(
    (client) => client.companyName.toLowerCase() === value.toLowerCase()
  );
  return clientExists ? null : "Client not found";
};


// Validate Bank Name
export const validateBankName = (value: string): string | null => {
  if (!value.trim()) {
    return "Bank Name is required";
  }
  const bankNameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
  return bankNameRegex.test(value) ? null : "Bank Name must contain only letters";
};

// Validate Cheque Number
export const validateChequeNumber = (value: string): string | null => {
  if (!value.trim()) {
    return "Cheque Number is required";
  }
  const chequeNumberRegex = /^[A-Za-z0-9]{6,20}$/; // Letters & numbers, 6-20 characters
  return chequeNumberRegex.test(value) ? null : "Cheque Number must be 6-20 alphanumeric characters";
};

// Validate Vehicle Number (Indian Format Example: MH12AB1234 or KA-05-XY-6789)
export const validateVehicleNumber = (value: string): string | null => {
  if (!value.trim()) {
    return "Vehicle Number is required";
  }
  const vehicleNumberRegex = /^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{4}$/; // Supports MH12AB1234 format
  return vehicleNumberRegex.test(value) ? null : "Invalid Vehicle Number format";
};

// Validate PO Number (Purchase Order Number)
export const validatePONumber = (value: string): string | null => {
  if (!value.trim()) {
    return "PO Number is required";
  }
  const poNumberRegex = /^[A-Za-z0-9]+$/; // Alphanumeric, no length limit
  return poNumberRegex.test(value) ? null : "PO Number must be alphanumeric";
};

export const validateTransactionUnits = (
  value: number | string, 
  TRType: string, 
  availableQuantity: string | number // Handle string input from the API
): string | null => {
  if( TRType===""){
    return "Transaction type must be specified"
  }
  if (!value || isNaN(Number(value))) {
    return "Transaction Units are required"; // Ensure input is not empty
  }

  const transactionUnits = Number(value);
  const quantity = Number(availableQuantity); // Convert availableQuantity to number

  if (TRType === "sell" && transactionUnits > quantity) {
    return `Transaction Units cannot exceed available quantity (${quantity})`;
  }

  return null; // Validation passed
};



