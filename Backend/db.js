const mongoose = require('mongoose');
// const mongoURI= "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.1";
const mongoURI="mongodb://localhost:27017/iNotebook";
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongodb successfully");
    })
}
module.exports=connectToMongo;