import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { prod } from "./lib/contants";
import { auth } from "./controller/auth";
import { user } from "./controller/user";
import { task } from "./controller/tasks";

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET as string;

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: prod,
    credentials: true,
  })
);

export const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(auth);
app.use(user);
app.use(task);

app.listen(4000);
