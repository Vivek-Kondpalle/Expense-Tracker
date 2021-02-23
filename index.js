const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const transactions = require("./routes/transactions");

const app = express();

app.use(express.json()); // Body-Parser. Using we can access text and amount from front end

app.use("/api/v1/transactions", transactions); // when "/api/v1/transactions" route is searched it would give .get("/") method of transactions route

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow
  );
});
