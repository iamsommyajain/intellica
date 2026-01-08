import express from "express";
import { youtubeSummaryController } from "../controllers/youtube.controller.js";

const router = express.Router();

router.post("/youtube_summary/", youtubeSummaryController);

export default router;
