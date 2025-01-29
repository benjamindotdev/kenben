import express from "express";
import prisma from "./db";
import { generateToken, verifyToken } from "./utils/jwt";
import { getItemsByStatus, ItemStatus } from "./utils/getItemsByStatus";

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(express.json());

app.post("/", async (req, res) => {
  const { user } = req.body;
  const { username, email, password } = user;
  const token = generateToken({ username });
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password,
      token,
    },
  });
  res.json(newUser);
});

app.get("/:username", async (req, res) => {
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
      username: username,
    },
    include: {
      items: true,
    },
  });

  if (!user) {
    res.status(404).json({ error: "User not found" });
  } else {
    res.status(200).json(user);
  }
});

app.post("/:username", async (req, res) => {
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
      user: {
        connect: {
          username,
        },
      },
    },
  });
  res.json(newItem);
});

app.put("/:username", async (req, res) => {
  const { username } = req.params;
  const { user } = req.body;
  const updatedUser = await prisma.user.update({
    where: {
      username,
    },
    data: user,
  });
  res.json(updatedUser);
});

app.delete("/:username", async (req, res) => {
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

  const deletedUser = await prisma.user.delete({
    where: {
      username,
    },
  });
  res.json(deletedUser);
});

app.get("/:username/:itemId", async (req, res) => {
  const { username, itemId } = req.params;
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

  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
    include: {
      user: true,
    },
  });

  if (!item || item.user.username !== username) {
    res.status(404).json({ error: "Item not found" });
  } else {
    res.status(200).json(item);
  }
});

app.put("/:username/:itemId", async (req, res) => {
  const { username, itemId } = req.params;
  const { item } = req.body;
  const { title, description, assignee, status, priority, dueDate } = item;
  const updatedItem = await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      title,
      description,
      assignee,
      status,
      priority,
      dueDate,
    },
  });
  res.json(updatedItem);
});

app.delete("/:username/:itemId", async (req, res) => {
  const { username, itemId } = req.params;
  const deletedItem = await prisma.item.delete({
    where: {
      id: itemId,
    },
  });
  res.json(deletedItem);
});

const statusRoutes = {
  done: ItemStatus.DONE,
  inprogress: ItemStatus.IN_PROGRESS,
  backlog: ItemStatus.BACKLOG,
  todo: ItemStatus.TODO,
};

Object.entries(statusRoutes).forEach(([route, status]) => {
  app.get(`/:username/${route}`, (req, res) => {
    getItemsByStatus(req, res, status);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
