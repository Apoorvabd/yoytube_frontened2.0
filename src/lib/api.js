import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_URL ||
    "https://youtube-backend-vdcg.onrender.com/api/v1",
  withCredentials: true,
});

// ------------------------
// Helpers
// ------------------------

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearStoredUser = () => {
  localStorage.removeItem("user");
};

// ------------------------
// Request Interceptor
// ------------------------

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

export const getAuthHeaders = () => {
  const token = getStoredUser()?.accessToken;

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

// ------------------------
// Response Interceptor
// ------------------------

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/users/refresh-token"
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post("/users/refresh-token");

        const newAccessToken = data.data.accessToken;

        const storedUser = getStoredUser();

        setStoredUser({
          ...storedUser,
          accessToken: newAccessToken,
        });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        clearStoredUser();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;