import { callApi } from "../apis";

const getAllBanners = () => {
  return callApi("/admin/button_menu_webs", "get");
};

const createBanner = (params) => {
  return callApi('/admin/button_menu_webs', "post", params);
};

const deleteBanner = (id) => {
  return callApi(`/admin/button_menu_webs/${id}`, "delete");
};

const updateBanner = (id, params) => {
  return callApi(`/admin/button_menu_webs/${id}`, "put", params);
};

const getBannersById = (id) => {
  return callApi(`/admin/button_menu_webs/${id}`, "get");
};

export const buttonMenu = {
  getAllBanners,
  getBannersById,
  createBanner,
  deleteBanner,
  updateBanner
};
