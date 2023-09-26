import { callApi } from "../apis";

const getAllProducts = (keyword, status, page) => {
  return callApi(`/admin/v1/products?search=${keyword}&page=${page}${status ? `&status=${status}` : ''}`, "get");
};

const getProductsById = (id) => {
  return callApi(`/admin/v1/products/${id}`, "get");
};

const changeStatusProduct = (id, params) => {
  return callApi(`/admin/v1/products/${id}`, "put", params);
};

export const products = {
  getAllProducts,
  getProductsById,
  changeStatusProduct
};
