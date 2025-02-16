import express from "express";
import prisma from "../../db";
import { verifyToken } from "../../utils/jwt";
import getUsernameFromToken from "../../utils/getUsernameFromToken";

const itemsRouter = express.Router();

itemsRouter.get("/", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const username = getUsernameFromToken(token);

    const user = await prisma.user.findUnique({
        where: {
            username
        },
        include: {
            items: true,
        }
    });
    if (user) {
        user.password = "";
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

itemsRouter.post("/", async (req, res) => {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const username = getUsernameFromToken(token);

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    const { item } = req.body;

    if (!item) {
        res.status(400).json({ error: "Bad request, no item" });
        return;
    }

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
                    username
                }
            }
        }
    });

    res.json(newItem);
});

itemsRouter.put("/", async (req, res) => {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const username = getUsernameFromToken(token);

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    const { item } = req.body;

    const updatedItem = await prisma.item.update({
        where: {
            id: item.id
        },
        data: {
            title: item.title,
            description: item.description,
            assignee: item.assignee,
            status: item.status,
            priority: item.priority,
            dueDate: item.dueDate
        }
    });

    res.json(updatedItem);
});

itemsRouter.delete("/", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const username = getUsernameFromToken(token);

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    const { item } = req.body;

    const deletedItem = await prisma.item.delete({
        where: {
            id: item.id
        }
    });

    res.json(deletedItem);
});

export default itemsRouter;
