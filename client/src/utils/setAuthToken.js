import axios from "axios";
window.axios = axios;

const setAuthToken = token => {
  // Apply to every request
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }

  // Delete auth header
  delete axios.defaults.headers.common["Authorization"];
};

export default setAuthToken;
