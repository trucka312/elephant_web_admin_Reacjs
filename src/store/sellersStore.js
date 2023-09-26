import { create } from "zustand";
import { RepositoryRemote } from "../services";

export const useSellersStore = create((set) => ({
  sellers: {},
  sellerById: {},
  infoTable: {},
  loading: false,
  loadingById: false,
  getAllSellers: async ( onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.sellers.getAllSellers();
      set({ sellers: response.data.data.data });
      set({ infoTable: response.data.data }); 
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  getSellersById: async (id, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loadingById: true });
      const response = await RepositoryRemote.sellers.getSellersById(id);
      set({ sellerById: response.data.data });
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loadingById: false });
  },
  searchSeller : async (query, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.sellers.searchSeller(query);
      set({ sellers: response.data.data.data });
      set({ infoTable: response.data.data }); 
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
}));
