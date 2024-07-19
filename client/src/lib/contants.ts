import axios from "axios";
import { createContext } from "react";
import { GlobalData } from "./types";

export const baseUrl = "http://localhost:4173";

export const axiosinstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const globalContext = createContext<GlobalData>({
  navigate: () => {},
  setResponseStatus: () => {},
  tasks: [],
  setTasks: () => {},
});
