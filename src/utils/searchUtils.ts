import {
  searchCategories,
  searchClients,
  searchInventories,
  searchInvoices,
  searchInvoicesByClientId,
  searchPurchases,
  searchSuppliers,
} from "./searchHandlers";

export const getSearchFunction = (pathname: string) => {
  if (pathname.includes("/clients")) {
    return searchClients;
  } else if (pathname.includes("/suppliers")) {
    return searchSuppliers;
  } else if (pathname.includes("/invoices")) {
    return searchInvoices;
  } else if (pathname.includes("/purchase")) {
    return searchPurchases;
  } else if (pathname.includes("/inventory/InventoryTable")) {
    return searchInventories;
  } else if (pathname.includes("/inventory")) {
    return searchCategories;
  } else if (pathname.includes("/clients/Detailpage")) {
    return searchInvoicesByClientId;
  }
  return null; // No matching function found
};
