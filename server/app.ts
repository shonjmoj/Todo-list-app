import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import express from "express";
import { login, logout, signup } from "./auth";
import { verifyToken } from "./lib/middleware";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { getTasks } from "./task";
import { clientUrl } from "./lib/utils";
import { getUser } from "./user";

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET as string;

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);
const protectedRoutes = express.Router();
const publicRoutes = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export const prisma = new PrismaClient();

publicRoutes.post("/signup", signup);
publicRoutes.post("/login", login);

protectedRoutes.use(verifyToken);
protectedRoutes.post("/logout", logout);
protectedRoutes.get("/me", getUser);
protectedRoutes.get("/tasks", getTasks);

app.use(publicRoutes);
app.use(protectedRoutes);

app.listen(4000, () => {});
