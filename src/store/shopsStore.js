import { create } from "zustand";
import { RepositoryRemote } from "../services";

export const useShopsStore = create((set) => ({
  stores: {},
  storeById: {},
  infoTable: {},
  loading: false,
  loadingById: false,
  getAllStores: async ( onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.stores.getAllStores();
      set({ stores: response.data.data.data });
      set({ infoTable: response.data.data }); 
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  getStoreById: async (id, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loadingById: true });
      const response = await RepositoryRemote.stores.getStoreById(id);
      set({ storeById: response.data.data });
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loadingById: false });
  },
  searchStores : async (query, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.stores.searchStores(query);
      set({ stores: response.data.data.data });
      set({ infoTable: response.data.data }); 
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
}));
