import express from "express";

const videoRouter = express.Router();

const handleVideoWatch = (req, res) => res.send("Video Watch!!");
const handleVideoEdit = (req, res) => res.send("Video Edit~!");

videoRouter.get("/watch", handleVideoWatch);
videoRouter.get("/edit",handleVideoEdit);

export default videoRouter;