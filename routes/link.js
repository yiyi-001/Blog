const express = require ('express');
const router = require('express').Router();
const bodyParser = require("body-parser");
const LinkController = require('../controllers/link');


// 获取友链列表

router.get ('/', async(req,res)=>{
  let data = req.query
  // console.log(data)
  try{
    let result = await LinkController.list(data);
    res.send(result)
  }catch(e){
    // console.log('/===>>>',e.message);
    
    res.send(result)
  }
});  




router.get ('/delete',async(req,res)=>{
  let id = req.query.id;
  // console.log('id ===>>>',id);
  try{
    let result = await LinkController.remove(id)
    res.send(result)
  }catch(e){
    console.log('/===>>>',e.message);
    res.send(result)
  }
  
});   

router.post ('/edit', async(req,res)=>{
  let data = req.body
  console.log("data===>>>",data);
  
  try{
    let result = await LinkController.update(data)
    res.send(result)
  }catch(e){
    console.log('/edit===>>>',e.message);
    res.send(result)
  }
});   

router.post ('/add', async(req,res)=>{
  let data = req.body
  console.log("data===>>>",data);
  
  try{
    let result = await LinkController.add(data)
    res.send(result)
  }catch(e){
    console.log('/add===>>>',e.message);
    res.send(result)
  }
});   





module.exports = router;
