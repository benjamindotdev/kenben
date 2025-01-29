import { Request, Response } from "express";
import prisma from "../db"; // Adjust the import based on your project structure
import { verifyToken } from "./jwt"; // Adjust the import based on your project structure

enum ItemStatus {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
  TODO = "TODO",
  BACKLOG = "BACKLOG",
}

const getItemsByStatus = async (
  req: Request,
  res: Response,
  status: ItemStatus
) => {
  const { username } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const decoded = verifyToken(token);

  if (decoded !== username) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const items = await prisma.item.findMany({
    where: {
      status,
      assignee: user.username,
    },
  });

  res.json(items);
};

export { getItemsByStatus, ItemStatus };
