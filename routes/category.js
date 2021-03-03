const express = require ('express');
const router = require('express').Router();
const bodyParser = require("body-parser");
const CategoryController = require('../controllers/category');


// 分类

router.get ('/', async(req,res)=>{
  let data = req.query
  // console.log(data)
  try{
    let result = await CategoryController.list(data);
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
    let result = await CategoryController.remove(id)
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
    let result = await CategoryController.update(data)
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
    let result = await CategoryController.add(data)
    res.send(result)
  }catch(e){
    console.log('/add===>>>',e.message);
    res.send(result)
  }
});   





module.exports = router;
