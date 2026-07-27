import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:8000/api/v1",
  // baseURL: "http://localhost:8000/api/v1",
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


// Automatically append access token
api.interceptors.request.use(
  (config) => {
    const token = getStoredUser()?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Automatically refresh expired token
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post(
          "/users/refresh-token"
        );

        const newAccessToken =
          refreshResponse.data.data.accessToken;

        const storedUser = getStoredUser();

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...storedUser,
            accessToken: newAccessToken,
          })
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);


export default api;