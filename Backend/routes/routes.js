const express=require('express');
const Router=express.Router();
const {compareVehicles}=require('../main.js')


function convertToJson(inputString) {
  try {
    const jsonString = inputString.split('```\n')[1].split('\n```')[0];
    const jsonData = JSON.parse(jsonString);
    return jsonData;
  } catch (error) {
    return { error: "Failed to parse the JSON string", details: error.message };
  }
}
Router.post('/summery',async (req,res)=>{
    const entity1=req.body.entity1;
    const entity2=req.body.entity2; 
    const n=req.body.n;   
    const summry=await compareVehicles(entity1,entity2,n);
    console.log("heloo");
    const summryjson=convertToJson(summry);;
    res.status(200).json({summryjson});

})
module.exports={
  Router
}