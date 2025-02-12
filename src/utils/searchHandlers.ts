import axiosInstance from "../api/axios";

export const searchClients = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/clients/search`, {
      params: { query },
    });

    return response.data;
  } catch (error) {
    console.error("Search client error:", error);
    throw error;
  }
};

export const searchSuppliers = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/suppliers/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Search Suppliers error:", error);
    throw error;
  }
};

export const searchInvoices = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/invoices/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Search Invoices error:", error);
    throw error;
  }
};
export const searchInvoicesByClientId = async (query: string) => {
  const pathParts = window.location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  try {
    const response = await axiosInstance.get(`/clients/${id}/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Search Invoices error:", error);
    throw error;
  }
};

export const searchPurchases = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/purchase/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Search Purchases error:", error);
    throw error;
  }
};

export const searchInventories = async (query: string) => {
  const pathParts = window.location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  try {
    const response = await axiosInstance.get(`/inventory/${id}/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Search Inventories error:", error);
    throw error;
  }
};
export const searchCategories = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/category/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Search Categories error:", error);
    throw error;
  }
};
