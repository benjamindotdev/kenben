import express from "express";
import prisma from "../../db";
import { generateToken } from "../../utils/jwt";
import { hashPassword, comparePassword } from "../../utils/bcrypt";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    console.log(req.body);

    const { user } = req.body;

    if (!user) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    if (!user.username || !user.password) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    console.log(user);
    const { username, password } = user;
    if (await prisma.user.findFirst({ where: { username } })) {
        res.status(400).json({ error: "Username already exists" });
        return;
    }
    try {
        const hashedPassword = await hashPassword(password);
        const token = generateToken({ username });
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                token
            }
        });
        newUser && res.json({ token, username });
    } catch (error) {
        res.status(500).json({ error: "Internal server error. User not created" });
    }
});

authRouter.post("/login", async (req, res) => {
    if (!req.body.username) {
        res.status(400).json({ error: "Bad request, no username" });
        return;
    }

    if (!req.body.password) {
        res.status(400).json({ error: "Bad request, no password" });
        return;
    }

    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            username
        }
    });

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    const passwordMatch = await comparePassword(password, user.password!);

    if (!passwordMatch) {
        res.status(401).json({ error: "Unauthorized, password incorrect" });
        return;
    }

    const token = generateToken({ username: user.username });

    await prisma.user.update({
        where: {
            username
        },
        data: {
            token
        }
    });

    res.json({ token, username: user.username });
});

export default authRouter;
