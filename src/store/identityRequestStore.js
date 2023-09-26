import { create } from "zustand";
import { RepositoryRemote } from "../services";

export const useIdentityRequestsStore = create((set) => ({
  identityRequests: {},
  identityRequestById: {},
  infoTable: {},
  loading: false,
  loadingStatus: false,
  getAllIdentityRequest: async ( onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.identityRequest.getAllIdentityRequest();
      set({ identityRequests: response.data.data.data });
      set({ infoTable: response.data.data }); 
      onSuccess(response.data.data)
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  getIdentityRequestById: async ( id, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.identityRequest.getIdentityRequestById(id);
      set({ identityRequestById: response.data.data });
      onSuccess(response.data.data);
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loading: false });
  },
  changeStatusIdentity: async ( id, params, onSuccess = () => {}, onFail = () => {}) => {
    try {
      set({ loadingStatus: true });
      const response = await RepositoryRemote.identityRequest.changeStatusIdentity(id, params);
      set({ identityRequestById: response.data.data });
      onSuccess();
    } catch (error) {
      onFail(error?.response?.data?.msg || "Có lỗi xảy ra!");
    }
    set({ loadingStatus: false });
  },
}));
