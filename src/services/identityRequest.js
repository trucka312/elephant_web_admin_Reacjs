import { callApi } from "../apis";

const getAllIdentityRequest = () => {
  return callApi(`/admin/v1/sellers`, "get");
};

const getIdentityRequestById = (id) => {
  return callApi(`/admin/v1/sellers/${id}`, "get");
};

const changeStatusIdentity = (id, params) => {
  return callApi(`/admin/v1/sellers/${id}/status`, "put", params);
};

export const identityRequest = {
  getAllIdentityRequest,
  getIdentityRequestById,
  changeStatusIdentity
};
