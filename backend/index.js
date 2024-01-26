const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors());

// requring .env
require('dotenv').config()

// connecting to db 
const connect=require("./Model/Configdb");
connect();
// port
let port=process.env.PORT;
// using parsers 
app.use(express.json());
app.use(express.urlencoded({extends:true}));

// listing on port 3000
app.listen(port,(req,res)=>{
    console.log(`app is listeng on port ${port}`);
});

// route for worong path 


// routes
let todoroute =require("./Routes/todolistroutes");
app.use("/",todoroute);