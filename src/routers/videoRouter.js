import express from "express";
import { watch,postEdit, getEdit  } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit",getEdit ); 
videoRouter.post("/:id(\\d+)/edit", postEdit); 



export default videoRouter;