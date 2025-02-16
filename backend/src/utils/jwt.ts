// src/config/jwt.ts
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your-secret-key";

export const generateToken = (
  payload: object,
  expiresIn: string | number = "1h"
) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error: any) {
    return error.message;
  }
};
