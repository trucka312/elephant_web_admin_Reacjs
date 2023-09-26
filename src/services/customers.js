import { callApi } from "../apis";

const getAllCustomers = (keyword) => {
  return callApi(`/admin/v1/manage/customers?search=${keyword}`, "get");
};

const getCustomerById = (id) => {
  return callApi(`/admin/v1/manage/customers/${id}`, "get");
};

export const customers = {
  getAllCustomers,
  getCustomerById,
};