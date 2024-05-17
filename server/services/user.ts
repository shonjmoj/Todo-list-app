import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../app";

export const getUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies["token"];
    const verified = jwt.verify(token, jwtSecret);

    if (!verified) {
      return res.status(401).send("Access denied");
    }
    res.status(200).send(verified);
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
