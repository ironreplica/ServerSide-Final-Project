const express = require("express");
require('dotenv').config()

const app = express();
const PORT = process.env.port || 3000;

app.use(express.json());
// console.log(process.env) // remove this after you've confirmed it is working

app.use("/", require("./routes"));

app.listen(PORT, () => console.log(`server is running on: ${PORT}`));