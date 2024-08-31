import axios from "axios";
import { createContext } from "react";
import { GlobalData } from "./types";

export const baseUrl = "https://todo-list-app-3069.onrender.com";

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
