import { callApi } from "../apis";

const getAllVouchers = () => {
  return callApi("/admin/v1/vouchers", "get");
};

const createVoucher = (params) => {
  return callApi('/admin/v1/vouchers/', "post", params);
};

const deleteVoucher = (id) => {
  return callApi(`/admin/v1/vouchers/${id}`, "delete");
};

const updateVoucher = (id, params) => {
  return callApi(`/admin/v1/vouchers/${id}`, "put", params);
};

const getVouchersById = (id) => {
  return callApi(`/admin/v1/vouchers/${id}`, "get");
};

const changeStatusVouchers = (id, params) => {
  return callApi(`/admin/v1/vouchers/${id}`, "put", params);
};

export const vouchers = {
  getAllVouchers,
  getVouchersById,
  changeStatusVouchers,
  createVoucher,
  deleteVoucher,
  updateVoucher
};
