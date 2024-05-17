import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../app";
import { UNAUTHORIZED } from "../lib/contants";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["token"];
  if (!token) {
    return res.status(401).send(UNAUTHORIZED);
  }
  try {
    const verified = jwt.verify(token, jwtSecret);
    if (!verified) {
      return res.status(401).send(UNAUTHORIZED);
    }
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
