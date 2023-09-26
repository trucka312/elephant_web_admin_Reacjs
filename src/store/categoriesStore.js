import { create } from "zustand";
import { RepositoryRemote } from "../services";

export const useCategoriesStore = create((set) => ({
  categories: {},
  categoriesById: {},
  infoTable: {},
  loading: false,
  loadingById: false,
  getAllCategories: async ( onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.categories.getAllCategories();
      set({ categories: response.data.data.data });
      set({ infoTable: response.data.data }); 
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  getCategoriesById: async ( id, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loadingById: true });
      const response = await RepositoryRemote.categories.getCategoriesById(id);
      set({ categoriesById: response.data.data });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loadingById: false });
  }
}));