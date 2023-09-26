import { callApi } from "../apis";

const getAllBanners = () => {
  return callApi("/admin/v1/banner_webad", "get");
};

const createBanner = (params) => {
  return callApi('/admin/v1/banner_webad', "post", params);
};

const deleteBanner = (id) => {
  return callApi(`/admin/v1/banner_webad/${id}`, "delete");
};

const updateBanner = (id, params) => {
  return callApi(`/admin/v1/banner_webad/${id}`, "put", params);
};

const getBannersById = (id) => {
  return callApi(`/admin/v1/banner_webad/${id}`, "get");
};

export const bannersAds = {
  getAllBanners,
  getBannersById,
  createBanner,
  deleteBanner,
  updateBanner
};
