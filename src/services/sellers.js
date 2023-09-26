import { callApi } from "../apis";

const getAllSellers = () => {
  return callApi(`/admin/manage/users`, "get");
};

const getSellersById = (id) => {
  return callApi(`/admin/manage/users/${id}`, "get");
};

const searchSeller = (query) => {
    return callApi(`/admin/manage/users?${query}`, "get");
  };

export const sellers = {
  getAllSellers,
  getSellersById,
  searchSeller
};
