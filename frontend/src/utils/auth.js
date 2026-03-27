// src/utils/auth.js

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem("Tokens"));
};
export const getRole = () => {
  return localStorage.getItem("role");
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};