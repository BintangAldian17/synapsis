import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const prefix = "/public/v2";

export const authApi = axios.create({
  baseURL: BASE_URL,
});

export const api = axios.create({
  baseURL: BASE_URL,
});

export const API_ENDPOINT = {
  USER: `${prefix}/users`,
  POST: `${prefix}/posts`,
};

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
