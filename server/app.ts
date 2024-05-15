import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import express from "express";
import { login, signup } from "./auth";
import { verifyToken } from "./lib/middleware";
import dotenv from "dotenv";

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET as string;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(verifyToken);

export const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/signup", signup);
app.post("/login", login);

app.listen(4000, () => {});
