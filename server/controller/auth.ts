import express from "express";
import { login, signup } from "../services/auth";

export const auth = express.Router();

auth.post("/signup", signup);
auth.post("/login", login);
