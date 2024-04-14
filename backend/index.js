const express = require('express');
const app = express();
const connectDatabase = require("./dbconnect/dbconnect.js");
const dotenv = require("dotenv");
dotenv.config({ path : "./config/config.env" });


const port = process.env.PORT;
app.use(express.json());

connectDatabase();
app.get("/", async (req,res ) => {
    res.send("HELLO WORLD !!! ");
})



app.listen(port, ()=>{
    console.log(`listening to port : ${port} `);
})