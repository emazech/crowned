// src/api.js

import axiosInstance from "./axiosInstance";

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
