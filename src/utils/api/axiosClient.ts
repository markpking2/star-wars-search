import axios from "axios";

export const axiosClient = () => {
  return axios.create({
    baseURL:
      typeof window === "undefined"
        ? process.env.HOST_URL || "http://localhost:3000"
        : window.location.origin,
  });
};
