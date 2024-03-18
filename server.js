// const { Server } = require("socket.io");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const http = require('http');


require("dotenv").config();

const app = express();
const PORT = process.env.port || 3000;

const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
// console.log(process.env) // remove this after you've confirmed it is working

app.use("/", require("./routes"));

io.on('connection', (socket) => {
    console.log("a user connected");
});

app.listen(PORT, () => console.log(`server is running on: ${PORT}`));
