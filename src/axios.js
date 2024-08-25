import axios from "axios";
import store from "./store";

const apiKey = "https://staging-api.business.incredit.kz/api/";

const instance = axios.create({
  baseURL: apiKey,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const activeToken = store.getters.getAccessToken;

    if (activeToken) {
      config.headers.Authorization = `Bearer ${activeToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      setTimeout(reloadPage, 1000);
    }
    return Promise.reject(error);
  }
);

function reloadPage() {
  location.reload();
}

export default instance;
