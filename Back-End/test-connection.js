// test-connection.js
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Azure Cosmos DB MongoDB"))
  .catch((err) => console.error("Connection error:", err));