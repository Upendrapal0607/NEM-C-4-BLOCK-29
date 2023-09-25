const express= require("express");
const { connection } = require("./db");
const { UserRoute } = require("./Routes/UserRoute");
const { PostRoute } = require("./Routes/PostRoute");
const cors= require("cors");
require("dotenv").config()
const app= express();
app.use(express.json());
app.use(cors())
app.use("/users",UserRoute)
app.use("/posts",PostRoute)
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to the DataBase");
        console.log(`server is running on port ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
})