import { Request, Response } from "express";
import { prisma } from "./app";
import { hashPassword } from "./hashPassword";

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
