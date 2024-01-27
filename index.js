require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
  const dbConnection  =require('./db/connect.js')
const userRoutes = require("./routes/user.js");
 
const { func } = require("joi");
const app = express();
//Database connection
dbConnection()
// middlewares for parsing
app.use(cors());
app.use(express.json());
// Routes/api end points
app.use("/api/users/", userRoutes);
 

const PORT = process.env.PORT || 8080; 
const server = function(){
    app.listen(PORT,() => {
        console.log(`Server is running successfully on PORT ${PORT}`)
    })
}
server()