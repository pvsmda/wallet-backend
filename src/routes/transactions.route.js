import express from "express";

import {
  deleteTransaction,
  createTransaction,
  getTransactionsByUserId,
  getSummary,
} from "../controllers/transactionsControllers.js";
const router = express.Router();

router.get("/:userId", getTransactionsByUserId);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getSummary);

export default router;
