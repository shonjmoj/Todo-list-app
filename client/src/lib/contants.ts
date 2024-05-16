import axios from "axios";

export const baseUrl = "http://localhost:4000";

export const axiosinstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
