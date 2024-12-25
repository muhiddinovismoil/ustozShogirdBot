import { Router } from "express";
import postsRouter from "./post.routes.js";
import usersRouter from "./user.routes.js";
const router = Router();
router.use("/posts", postsRouter);
router.use("/users", usersRouter);
export default router;
