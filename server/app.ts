import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import express from "express";
import { signup } from "./auth";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export const prisma = new PrismaClient();

app.post("/signup", signup);

app.listen(4000, () => {});
