import { callApi } from "../apis";

const getAllBanners = () => {
  return callApi("/admin/banners", "get");
};

const createBanner = (params) => {
  return callApi('/admin/banners', "post", params);
};

const deleteBanner = (id) => {
  return callApi(`/admin/banners/${id}`, "delete");
};

const updateBanner = (id, params) => {
  return callApi(`/admin/banners/${id}`, "put", params);
};

const getBannersById = (id) => {
  return callApi(`/admin/banners/${id}`, "get");
};

export const banners = {
  getAllBanners,
  getBannersById,
  createBanner,
  deleteBanner,
  updateBanner
};
