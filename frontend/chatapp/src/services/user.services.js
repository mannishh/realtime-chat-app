import api from "../lib/axios";

export const getTotalUsersCount = async () => {
  const response = await api.get("/user/count");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/user/");
  return response.data;
};

export const getUserStatus = async () => {
  const response = await api.get("/user/getStatus");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};
