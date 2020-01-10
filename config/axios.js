import axios from "axios";

const baseURL = "https://ebipatas.com/tams/api.php";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 1000
});

// request interceptor
axiosInstance.interceptors.request.use(
  function(config) {
    // config.headers = { ...config.headers, auth_token: getAuthToken() };
    // you can also do other modification in config
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  function(response) {
    if (response.status === 401) {
      // your failure logic
      console.log("Error");
    }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);
