import { prisma } from "../app";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_PASSWORD,
  USER_ALREADY_EXISTS,
  USER_CREATED,
  USER_NOT_FOUND,
} from "../lib/contants";
import { hashPassword } from "../lib/lib";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = {
      username,
      password: await hashPassword(password),
    };
    const existingUser = await prisma.user.findFirst({
      where: {
        username: user.username,
      },
    });
    if (existingUser) {
      return res.status(400).send(USER_ALREADY_EXISTS);
    }

    await prisma.user.create({
      data: {
        ...user,
      },
    });
    res.status(201).send(USER_CREATED);
  } catch (error) {
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        username: username as string,
      },
    });
    if (!user) {
      return res.status(404).send(USER_NOT_FOUND);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send(INVALID_PASSWORD);
    }
    const token = jwt.sign({ id: user.id, username: user.username }, "secret", {
      expiresIn: 1000 * 60 * 60 * 24,
    });
    res
      .cookie("token", token, { maxAge: 1000 * 60 * 60 * 25 })
      .status(200)
      .send("Welcome!");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
