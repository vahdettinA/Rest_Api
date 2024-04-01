const mongoose= require("mongoose");
const dotenv=require("dotenv");
const conn=()=>{
    mongoose.connect(process.env.DB_URL,{
        dbName:"myAPI"
    }).then(()=>{
        console.log("Database connected")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports =conn