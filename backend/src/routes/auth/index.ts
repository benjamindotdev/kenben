import express from "express";
import prisma from "../../db";
import { generateToken } from "../../utils/jwt";
import { hashPassword, comparePassword } from "../../utils/bcrypt";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {

console.log(req.body)

const { user } = req.body;

if (!user) {
    res.status(400).json({ error: "Bad request" });
    return;
}

if (!user.email || !user.username || !user.password) {
    res.status(400).json({ error: "Bad request" });
    return;
}

console.log(user)
const { email, username, password } = user;
if (await prisma.user.findFirst({where: {email}})) {
    res.status(400).json({ error: "Email already exists" });
    return;
}
if (await prisma.user.findFirst({where: {username}})) {
    res.status(400).json({ error: "Username already exists" });
    return;
}
const hashedPassword = await hashPassword(password);
const token = generateToken({ username });
const newUser = await prisma.user.create({
    data: {
    email,
    username,
    password: hashedPassword,
    token,
    },
});
newUser && res.json({token, username});
});

authRouter.post("/login", async (req, res) => {
if (!req.body.email) {
    res.status(400).json({ error: "Bad request, no email" });
    return;
}

if (!req.body.password) {
    res.status(400).json({ error: "Bad request, no password" });
    return;
}

const { email, password } = req.body;
const user = await prisma.user.findFirst({
    where:
    {
        email,
    },
});

if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
}

const passwordMatch = await comparePassword(password, user.password);

if (!passwordMatch) {
    res.status(401).json({ error: "Unauthorized, password incorrect" });
    return;
}

const token = generateToken({ email: user.email });

await prisma.user.update({
    where: {
    email: user.email,
    },
    data: {
    token,
    },
});

res.json({ token, username: user.username, email: user.email });
});

export default authRouter;