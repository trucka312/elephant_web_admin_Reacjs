import { create } from "zustand";
import { RepositoryRemote } from "../services";

export const useCustomersStore = create((set) => ({
  customers: {},
  customerById: {},
  infoTable: {},
  loading: false,
  loadingById: false,
  getAllCustomers: async (keyword, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.customers.getAllCustomers(keyword);
      set({ customers: response.data.data.data });
      set({ infoTable: response.data.data }); 
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  getCustomerById: async ( id, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loadingById: true });
      const response = await RepositoryRemote.customers.getCustomerById(id);
      set({ customerById: response.data.data });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loadingById: false });
  }
}));
