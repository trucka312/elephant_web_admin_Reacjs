import { callApi } from "../apis"

const login = (form) => {
  return callApi(`/admin/login`, "post", form);
};
const register = (form) => {
  return callApi(`/admin/register`, "post", form);
};
const checkExists = (form) => {
  return callApi(`/admin/login/check_exists`, "post", form);
};
const resetPassword = (form) => {
  return callApi(`/admin/reset_password`, "post", form);
};
const sendOtp = (form) => {
  return callApi(`/send_otp`, "post", form);
};
const sendEmailOtp = (form) => {
  return callApi(`/send_email_otp`, "post", form);
};

export const auth = {
  login,
  register,
  sendOtp,
  checkExists,
  resetPassword,
  sendEmailOtp,
};
