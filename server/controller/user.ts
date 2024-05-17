import express from "express";
import { verifyToken } from "../middlewares/auth";
import { getUser } from "../services/user";

export const user = express.Router();

user.use(verifyToken);

user.get("/me", getUser);
