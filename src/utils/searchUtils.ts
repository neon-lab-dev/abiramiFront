import { searchClients, searchSuppliers } from "./searchHandlers";

export const getSearchFunction = (pathname: string) => {
  if (pathname.includes("/clients")) {
    return searchClients;
  } else if (pathname.includes("/suppliers")) {
    return searchSuppliers;
  }
  return null; // No matching function found
};
