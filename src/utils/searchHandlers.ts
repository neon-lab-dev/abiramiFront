import axiosInstance from "../api/axios";

export const searchClients = async (query: string) => {
  try {
    const response = await axiosInstance.get(
      `/clients/search?query=${query}`
      //     {
      //   params: { query },
      // }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Search clients error:", error);
    return [];
  }
};

export const searchSuppliers = async (query: string) => {
  try {
    const response = await axiosInstance.get(
      `/suppliers/search?query=${query}`,
      {
        params: { query },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Search suppliers error:", error);
    return [];
  }
};
