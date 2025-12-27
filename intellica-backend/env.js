import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

console.log("ENV LOADED");
console.log("GROQ_API_KEY present:", !!process.env.GROQ_API_KEY);
