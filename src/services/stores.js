import { callApi } from "../apis";

const getAllStores = () => {
  return callApi(`/admin/manage/stores`, "get");
};

const getStoreById = (id) => {
  return callApi(`/admin/manage/stores/${id}`, "get");
};

const searchStores = (query) => {
    return callApi(`/admin/manage/stores?${query}`, "get");
  };

export const stores = {
  getAllStores,
  getStoreById,
  searchStores
};
