import axios from "axios";
import store from "./store";

const apiKey = "https://api.portal.demo.edus.kz/v1/ru/";

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

      config.headers["X-Connection-Id"] =
        store.getters.getOtherAccounts[0].connection.id; // Replace with your connection ID

      config.headers["X-Role-Id"] = store.getters.getOtherAccounts[0].role.id; // Replace with your role ID
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Logout user or perform any other action related to token expiration
      store.dispatch("logout"); // Assuming you have a logout action in your store
      setTimeout(reloadPage, 1000);
    }
    return Promise.reject(error);
  }
);

function reloadPage() {
  location.reload();
}

export default instance;
