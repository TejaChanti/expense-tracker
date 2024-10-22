const express = require("express");
const bodyParser = require("body-parser");
const transactionsRoutes = require("./routes/transactions");
const categoriesRoutes = require("./routes/categories");

const app = express();
app.use(bodyParser.json());

app.use("/transactions", transactionsRoutes);
app.use("/categories", categoriesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
