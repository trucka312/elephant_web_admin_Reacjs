import { create } from "zustand";
import { RepositoryRemote } from "../services";

export const useProductsStore = create((set) => ({
  products: {},
  productById: {},
  infoTable: {},
  loading: false,
  getAllProducts: async (keyword, status, page, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.products.getAllProducts(keyword, status, page);
      set({ products: response.data.data.data });
      set({ infoTable: response.data.data }); 
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  getProductsById: async ( id, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.products.getProductsById(id);
      set({ productById: response.data.data });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  changeStatusProduct: async ( id, params, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      RepositoryRemote.products.changeStatusProduct(id, params);
      onSuccess();
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
}));
