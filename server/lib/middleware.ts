import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../app";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.cookies);
  const token = req.cookies["token"];
  if (!token) {
    return res.status(401).send("Access denied");
  }
  try {
    const verified = jwt.verify(token, jwtSecret);
    if (!verified) {
      return res.status(401).send("Access denied");
    }
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
