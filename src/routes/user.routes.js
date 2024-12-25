import { Router } from "express";
const router = Router();
router.get("/", async (req, res) => {
    res.send("something");
});
router.delete("/:id", async (req, res) => {
    res.send("something");
});
export default router;
