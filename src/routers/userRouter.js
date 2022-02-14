import express from "express";

const userRouter = express.Router();

const handleEditUser = (req, res) => res.send("User Edit!");
const handleDeleteUser = (req, res) => res.send("User Delete!");

userRouter.get("/edit", handleEditUser);
userRouter.get("/delete",handleDeleteUser);

export default userRouter;

