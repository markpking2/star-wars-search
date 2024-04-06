import axios from "axios";

export const axiosClient = (
  baseURL = typeof window === "undefined"
    ? process.env.HOST_URL || "http://localhost:3000"
    : window.location.origin,
) => {
  return axios.create({
    baseURL,
  });
};
