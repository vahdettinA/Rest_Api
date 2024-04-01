const express = require("express");
const cors = require("cors");
const dotenv=require("dotenv");
const db=require("./config/db_connect.js");
const Auth=require("./routes/auth.js")
const Post=require("./routes/post.js")
dotenv.config();

db()
const app= express();

app.use(cors());
app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded({limit:'30mb',extended:true}))


app.use('/',Auth)
app.use('/',Post)


const PORT= process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log("server is run 5000");
});

