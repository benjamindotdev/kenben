import prisma from "../db";

import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

router.post("/", async (req, res) => {
  const { item } = req.body;
  const { title, description, assignee, status, priority, dueDate } = item;
  const newItem = await prisma.item.create({
    data: {
      title,
      description,
      assignee,
      status,
      priority,
      dueDate,
    },
  });
  res.json(newItem);
});
