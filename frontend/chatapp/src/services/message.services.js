import api from "../lib/axios";

// Fetch full chat history between logged-in user and receiverId
export const getMessages = async (receiverId) => {
  const response = await api.get(`/message/${receiverId}`);
  return response.data;
};
