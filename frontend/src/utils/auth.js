// src/utils/auth.js

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};