import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import dailyContentRoutes from "./routes/dailyContent.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import learningPathRoutes from "./routes/learningPath.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

console.log(process.env.GROQ_API_KEY);
connectDB();

const app = express();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);


app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
console.log("Mounting dailyContent routes");
app.use("/daily-content", dailyContentRoutes);
app.use("/learning", learningPathRoutes);

app.get("/", (_, res) => {
  res.send("Intellica Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
