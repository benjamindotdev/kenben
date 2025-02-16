import express from "express";
import authRouter from "./routes/auth";
import itemsRouter from "./routes/items";
import { getItemsByStatus, ItemStatus } from "./utils/getItemsByStatus";
import cors from "cors";

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());

app.use("/", authRouter);
app.use("/:username", itemsRouter);

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
