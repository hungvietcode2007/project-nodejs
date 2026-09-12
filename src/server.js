require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const configViewEngine = require("./config/viewEngine");
configViewEngine(app);
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));
const webRoutes = require("./routes/web");
app.use("/", webRoutes);
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
const connection = require("./config/database");
app.listen(port, hostname, () => {
  console.log(`server is running at ${hostname}:${port}`);
});
