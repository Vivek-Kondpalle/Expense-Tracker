const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactions");

// we could also do router.get("/"). But then we will need to write router.post("/") again. By using route("/")
// we can get,post through a single route.
router.route("/").get(getTransactions).post(addTransaction);
router.route("/:id").delete(deleteTransaction);

//router.route("/:id").delete();

module.exports = router;
