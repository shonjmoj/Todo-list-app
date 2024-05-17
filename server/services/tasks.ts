import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret, prisma } from "../app";
import { INTERNAL_SERVER_ERROR } from "../lib/contants";

export const getTasks = async (req: Request, res: Response) => {
  const verified = jwt.verify(req.cookies["token"], jwtSecret) as {
    id: string;
  };
  const { id } = verified;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        authorId: id,
      },
    });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const token = req.cookies["token"];
    const verified = jwt.verify(token, jwtSecret) as { id: string };
    const { id } = verified;
    const task = await prisma.task.create({
      data: {
        authorId: id,
        title: title as string,
        description: description as string,
        status: "pending",
      },
    });
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id, status, title, description } = req.body;
    const task = await prisma.task.findFirst({
      where: {
        id,
      },
    });
    if (!task) {
      return res.status(404).send("Task not found");
    }
    const newTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        status,
        description,
      },
    });
    res.status(200).send(newTask);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const task = await prisma.task.findFirst({
      where: {
        id,
      },
    });
    if (!task) {
      return res.status(404).send("Task not found");
    }
    await prisma.task.delete({
      where: {
        id,
      },
    });
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};
