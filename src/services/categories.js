import { callApi } from "../apis";

const getAllCategories = () => {
  return callApi(`/admin/v1/categories`, "get");
};

const getCustomerById = (id) => {
  return callApi(`/admin/v1/categories/${id}`, "get");
};

export const categories = {
  getAllCategories,
  getCustomerById,
};
