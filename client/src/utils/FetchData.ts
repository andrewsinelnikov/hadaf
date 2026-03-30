import axios from "axios";
import { store } from "../redux/store";
import { AUTH } from "../redux/types/authType";
import { ALERT } from "../redux/types/alertType";

// ── Axios instance ────────────────────────────────────────────────────────────

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? "/api",
  withCredentials: true, // send cookies (refresh token) on every request
});

// ── Request interceptor — attach Bearer token ─────────────────────────────────

API.interceptors.request.use((config) => {
  const token = store.getState().auth.access_token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor — handle 401 with token refresh ─────────────────────

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

const processQueue = (token: string) => {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Only attempt refresh on 401, and only once per request
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        // Queue this request until the refresh completes
        return new Promise((resolve) => {
          refreshQueue.push((token: string) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(API(original));
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL ?? "/api"}/refresh_token`,
          { withCredentials: true }
        );

        const { access_token, user } = res.data;

        store.dispatch({ type: AUTH, payload: { access_token, user } });
        localStorage.setItem("logged", "hadaf");

        processQueue(access_token);
        original.headers.Authorization = `Bearer ${access_token}`;
        return API(original);
      } catch (refreshError) {
        // Refresh failed — clear session and redirect to login
        refreshQueue = [];
        localStorage.removeItem("logged");
        store.dispatch({ type: AUTH, payload: {} });
        store.dispatch({
          type: ALERT,
          payload: { errors: "Session expired. Please sign in again." },
        });
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ── API helpers ───────────────────────────────────────────────────────────────

export const getAPI = (url: string) => API.get(url);

export const postAPI = (url: string, data: object) => API.post(url, data);

export const patchAPI = (url: string, data: object) => API.patch(url, data);

export const putAPI = (url: string, data: object) => API.put(url, data);

export const deleteAPI = (url: string) => API.delete(url);

export default API;