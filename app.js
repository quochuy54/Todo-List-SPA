const express = require("express");
const app = express();
const route = require('./route/index');
const mongoose = require('mongoose');
const cors=require("cors");
// Middleware
app.use(express.json());
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

//Connect MongoDB
mongoose.connect('mongodb://localhost:27017/todoSGP', {
    useNewUrlParser: true,
})
.then(()=> {console.log('connect Database successfully')})
.catch((err) => {console.log(err)});


app.use('/api/v1', route);


app.listen('3000', ()=> {console.log("App start at 3000")});