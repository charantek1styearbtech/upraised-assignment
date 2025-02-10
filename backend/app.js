const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const app=express();
const gadgetRouter=require('../backend/routes/gadets.routes');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('gadgets',gadgetRouter);
module.exports=app;