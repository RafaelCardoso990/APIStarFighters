import { Router } from "express";
import { SetBattle } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/battle", SetBattle)

export default userRouter;