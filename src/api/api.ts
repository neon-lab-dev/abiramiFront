/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import axiosInstance from "./axios";
import { API_BASE_URL } from "../config";
import Cookies from "js-cookie";
import { CreateClient } from "../types/client";

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (response.status === 200) {
      const token = response.data.token;
      Cookies.set("token", token);
      localStorage.setItem("admin", JSON.stringify(response.data.data));
      return response.data;
    } else {
      Cookies.remove("token");
      localStorage.removeItem("admin");
      alert("Invalid Credentials!!!");
    }
  } catch (error) {
    Cookies.remove("token");
    localStorage.removeItem("admin");
    console.error("Login error:", error);
    throw error;
  }
};
export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post("/admin/signup", {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const verifyAdminByToken = async (token: string) => {
  try {
    const response = await axiosInstance.get(`/verify`, {
      params: { token },
    });
    if (response.data.status === 200) {
      localStorage.setItem("admin", JSON.stringify(response.data.data));
      return response.data;
    }
  } catch (error) {
    console.error("Verify admin error:", error);
    throw error;
  }
};

//Dashboard APIs
export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.get("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};

// Client APIs
export const createClient = async (clientData: any) => {
  try {
    const response = await axiosInstance.post(`/clients`, clientData);
    return response.data;
  } catch (error) {
    console.error("Create client error:", error);
    throw error;
  }
};
export const getClients = async () => {
  try {
    const response = await axiosInstance.get("/clients");
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};
export const getClientById = async (id?: string) => {
  try {
    const response = await axiosInstance.get(`/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};
export const searchClient = async (query: string) => {
  const isNumber = !isNaN(Number(query));
  const params = isNumber ? { mobileNum: query } : { address: query };
  console.log(params);
  try {
    const response = await axiosInstance.get(`/clients/search`, { params });
    return response.data;
  } catch (error) {
    console.error("Search client error:", error);
    throw error;
  }
};
export const updateClient = async (clientData: CreateClient, id?: string) => {
  try {
    const response = await axiosInstance.put(`/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error("Update client error:", error);
    throw error;
  }
};
export const deleteClient = async (id: string | "") => {
  try {
    const response = await axiosInstance.delete(`/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete client error:", error);
    throw error;
  }
};

// Invoices APIs
export const createInvoices = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/invoices`, data);
    return response.data;
  } catch (error) {
    console.error("Create client error:", error);
    throw error;
  }
};
export const createInvoicesByClientName = async (
  data: any,
  clientName: string
) => {
  try {
    const response = await axiosInstance.post(`/invoices/${clientName}`, data);
    return response.data;
  } catch (error) {
    console.error("Create client error:", error);
    throw error;
  }
};
export const getInvoices = async () => {
  try {
    const response = await axiosInstance.get("/invoices");
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};
export const getInvoiceById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};
export const updateInvoice = async (id: string, invoiceData: any) => {
  try {
    const response = await axiosInstance.put(`/invoices/${id}`, invoiceData);
    return response.data;
  } catch (error) {
    console.error("Update invoice error:", error);
    throw error;
  }
};
export const deleteInvoice = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete invoice error:", error);
    throw error;
  }
};

// Inventory APIs
export const createInventories = async (data: any) => {
  try {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((item: any) => formData.append(key, item));
      } else {
        formData.append(key, data[key]);
      }
    });
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axiosInstance.post(`/inventory`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Create inventories error:", error);
    throw error;
  }
};

export const createCategory = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/inventory/category`, data);
    return response.data;
  } catch (error) {
    console.error("Create category error:", error);
    throw error;
  }
};

export const getInventoryData = async () => {
  try {
    const response = await axiosInstance.get("/inventory/items");
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};

export const getInventories = async () => {
  try {
    const response = await axiosInstance.get("/inventory");
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};

export const getInventoryById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};

export const getInventoryByCategoryId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/category/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};

export const updateInventories = async (id: string, data: any) => {
  try {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((item: any) => formData.append(key, item));
      } else {
        formData.append(key, data[key]);
      }
    });
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axiosInstance.put(`/inventory/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Update inventories error:", error);
    throw error;
  }
};

export const getInventoryLogsById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/4c40bb25-7498-4046-9448-55e5ae1d4382/logs`);
    console.log("log",response.data)
    return response.data;

  } catch (error) {
    console.error("Get inventory logs error:", error);
    throw error;
  }
};

export const updateInventoryLogs = async (inventoryId: string, logData: any) => {
  try {
    const response = await axiosInstance.put(`/inventory/${inventoryId}/logs`, logData, {
     
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating logs for inventory ${inventoryId}:`, error);
    throw error;
  }
};


export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/inventory/category");
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};

export const deleteInventory = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete inventory error:", error);
    throw error;
  }
};

// Suppliers APIs
export const createSupplier = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/suppliers`, data);
    return response.data;
  } catch (error) {
    console.error("Create client error:", error);
    throw error;
  }
};
export const getSuppliers = async () => {
  try {
    const response = await axiosInstance.get("/suppliers");
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};
export const getSupplierById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/suppliers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};

export const updateSupplier = async (id: string, supplierData: any) => {
  try {
    const response = await axiosInstance.put(`/suppliers/${id}`, supplierData);
    return response.data;
  } catch (error) {
    console.error("Update client error:", error);
    throw error;
  }
};

export const deleteSupplier = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/suppliers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete client error:", error);
    throw error;
  }
};

// Purchase APIs
export const createPurchase = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/purchase`, data);
    return response.data;
  } catch (error) {
    console.error("Create client error:", error);
    throw error;
  }
};
export const getPurchases = async () => {
  try {
    const response = await axiosInstance.get("/purchase");
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};
export const getPurchaseById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/purchase/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};
export const updatePurchase = async (id: string, purchaseData: any) => {
  try {
    const response = await axiosInstance.put(`/purchase/${id}`, purchaseData);
    return response.data;
  } catch (error) {
    console.error("Update client error:", error);
    throw error;
  }
};
export const deletePurchase = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/purchase/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete client error:", error);
    throw error;
  }
};
