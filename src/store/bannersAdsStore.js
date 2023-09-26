import { create } from "zustand";
import { RepositoryRemote } from "../services";

export const useBannersAdsStore = create((set) => ({
  banners: {},
  bannerById: {},
  loading: false,
  loadingById: false,
  getAllBanners: async ( onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.bannersAds.getAllBanners();
      set({ banners: response.data.data });
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  createBanner: async (params, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.bannersAds.createBanner(params);
      // set({ banners: response.data.data });
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  deleteBanner: async (id, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      await RepositoryRemote.bannersAds.deleteBanner(id);
      // console.log('response: ', response);
      // set((prev) => ({...prev, banners: prev.banners.filter((item) => item.id !== id)}));
      onSuccess()
    } catch (error) {
      console.log('error: ', error);
      onFail(error.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  updateBanner: async (id, params, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.bannersAds.updateBanner(id, params);
      // set({ banners: response.data.data });
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  getBannersById: async (id, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ bannerById: {} });
      set({ loading: true });
      const response = await RepositoryRemote.bannersAds.getBannersById(id);
      set({ bannerById: response.data.data });
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
}));
