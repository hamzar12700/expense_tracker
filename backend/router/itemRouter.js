import { Router } from "express";
import { createItem, deleteItem, getItems, updateItem } from "../controller/itemController.js";
const  router = Router();


router.get("/", getItems);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
