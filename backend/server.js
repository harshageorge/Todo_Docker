const express = require("express");
//Import the express dependency
const app = express();
const cors = require("cors");
var usersRouter = require("./router.js"); //Instantiate an express app, the main work horse of this server
// const PORT = process.env.NODE_DOCKER_PORT || 5000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
};

app.use(cors(corsOptions));


app.use("/", usersRouter);

app.listen(5000, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log("Backend is running");
});

