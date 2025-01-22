import axiosInstance from "./axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/admin/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
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

export const getClientById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};

export const searchClient = async (query) => {
  try {
    const response = await axiosInstance.get(`/clients/search`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Search client error:", error);
    throw error;
  }
};

export const updateClient = async (id, clientData) => {
  try {
    const response = await axiosInstance.put(`/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error("Update client error:", error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await axiosInstance.delete(`/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Update client error:", error);
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
export const getInvoices = async () => {
  try {
    const response = await axiosInstance.get("/invoices");
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};

// Inventory APIs
export const createInventories = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/inventories`, data);
    return response.data;
  } catch (error) {
    console.error("Create client error:", error);
    throw error;
  }
};
