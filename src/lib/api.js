import axios from "axios";

const api = axios.create({
  // baseURL: "https://youtube-backend-vdcg.onrender.com/api/v1",
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const getAuthHeaders = () => {
  const storedUser = getStoredUser();
  const token = storedUser?.accessToken;

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export default api;
