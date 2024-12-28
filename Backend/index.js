const express = require('express');
const bodyParser=require('body-parser');
const {Router}=require('./routes/routes.js');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/fromlink',Router);

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server is running`);


})
