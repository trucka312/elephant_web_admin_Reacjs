import { callApi } from "../apis";

const getAllBadges = () => {
  return callApi("/admin/v1/badges", "get");
};

export const badges = {
  getAllBadges,
};
