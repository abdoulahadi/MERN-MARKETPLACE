import axios from "axios";

const createAxiosInstance = (contentType) => {
  return axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": contentType,
    },
  });
}

export default createAxiosInstance;