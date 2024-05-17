import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/tasks";

export const task = express.Router();

task.get("/tasks", getTasks);
task.post("/addtask", createTask);
task.post("/updatetask", updateTask);
task.post("/deletetask", deleteTask);
