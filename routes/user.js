const express = require ('express');
const router = require('express').Router();
const bodyParser = require("body-parser");
const UserController = require('../controllers/user');


// 获取用户列表

router.get ('/', async(req,res)=>{
  let data = req.query
  console.log("userList===>>>")
  try{
    let result = await UserController.list(data);
    // console.log('result ===>>> ',result);
    
    res.send(result)
  }catch(e){
    console.log('/===>>>',e.message);
    res.send(result)
  }
});  



//删除用户信息
router.get ('/delete',async(req,res)=>{
  let id = req.query.id;
  // console.log('id ===>>>',id);
  try{
    let result = await UserController.remove(id)
    res.send(result)
  }catch(e){
    console.log('/===>>>',e.message);
    res.send(result)
  }
  
});   

// 编辑用户信息
router.post ('/edit', async(req,res)=>{
  let data = req.body
  console.log("data===>>>",data);
  
  try{
    let result = await UserController.update(data)
    res.send(result)
  }catch(e){
    console.log('/edit===>>>',e.message);
    res.send(result)
  }
});   






module.exports = router;
