import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import path from "path";
import { serverStatus } from "./controller/view.controller";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import { connectToDatabase } from "./utils/connectToDb";
import { validateEnv } from "./utils/validateEnv";

dotenv.config({ path: "../.env" });

const app: Application = express();
const port = process.env.PORT;
validateEnv();
connectToDatabase();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve("./src/public")));

app.get("/", serverStatus);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(
    `🌐 Server running on port ${port} in [ 🛠️  ${process.env.NODE_ENV} ] mode`
  );
});
