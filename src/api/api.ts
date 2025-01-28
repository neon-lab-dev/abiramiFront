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
export const updateClient = async (id: string, clientData) => {
  try {
    const response = await axiosInstance.put(`/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error("Update client error:", error);
    throw error;
  }
};
export const deleteClient = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete client error:", error);
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
export const deleteSupplier = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/suppliers/${id}`);
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
export const createInvoicesByClientName = async (data: any, clientName) => {
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
export const updateInvoice = async (id: string, invoiceData) => {
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

    const response = await axiosInstance.post(`/inventories`, formData, {
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

export const getInventories = async () => {
  try {
    const response = await axiosInstance.get("/inventory");
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

    const response = await axiosInstance.put(`/inventories/${id}`, formData, {
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

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/inventory/category");
    return response.data;
  } catch (error) {
    console.error("Get clients error:", error);
    throw error;
  }
};
