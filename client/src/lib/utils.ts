import toast from "react-hot-toast";
import { axiosinstance } from "./contants";
import { userCredentials } from "./types";
import { AxiosError } from "axios";

export const signup = async (credentiels: userCredentials) => {
  try {
    const { status, data } = await axiosinstance.post("/signup", credentiels);
    if (status === 201) {
      toast.success(data);
    }
    return status;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data);
    }
  }
};

export const login = async (credentiels: userCredentials) => {
  try {
    const { status, data } = await axiosinstance.post("/login", credentiels);
    if (status === 200) {
      toast.success(data);
    }
    return status;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data);
    }
  }
};

export const logout = async () => {
  try {
    const { status } = await axiosinstance.post("/logout");
    return status;
  } catch (error) {
    console.error(error);
  }
};
