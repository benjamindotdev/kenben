import express from "express";
import pool from "./db";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
