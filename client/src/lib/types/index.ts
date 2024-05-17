import { NavigateFunction } from "react-router-dom";

export type UserData = { username: string };

export type GlobalData = {
  user?: {
    username: string;
  };
  tasks?: TaskProps[];
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[] | undefined>>;
  setResponseStatus: React.Dispatch<React.SetStateAction<number | undefined>>;
  navigate: NavigateFunction;
};

export type TaskData = {
  id: string;
  title?: string;
  description?: string;
  status?: "pending" | "completed";
};

export interface TaskProps {
  id?: string;
  title: string;
  description: string;
  deleteTask: (id: string) => void;
  updateTask: (taskData: TaskData) => void;
  status: "pending" | "completed";
}
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text: string;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string;
  label: string;
}

export type userCredentials = {
  username: string;
  password: string;
};
