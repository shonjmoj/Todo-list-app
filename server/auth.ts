import { Request, Response } from "express";
import { prisma } from "./app";
import { hashPassword } from "./lib/hashPassword";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = {
      username,
      password: await hashPassword(password),
    };
    await prisma.user.create({
      data: {
        ...user,
      },
    });
    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send("Error creating user");
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
      return res.status(404).send("User not found");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: 1000 * 60 * 60 * 24,
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 25 });
    res.status(200).send("Logged in");
  } catch (error) {
    res.status(500).send("Error logging in");
  }
};
