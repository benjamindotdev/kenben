import express from 'express';
import prisma from '../../db';
import { verifyToken } from '../../utils/jwt';

const itemsRouter = express.Router();

itemsRouter.get("/:username", async (req, res) => {
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

itemsRouter.post("/:username", async (req, res) => {
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

itemsRouter.put("/:username", async (req, res) => {
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

itemsRouter.delete("/:username", async (req, res) => {
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

export default itemsRouter;