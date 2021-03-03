const express = require ('express');
const router = require('express').Router();
const bodyParser = require("body-parser");
const ArticleController = require('../controllers/article');
const path = require('path')
const multer = require("multer")
const upload = multer({dest: 'uploads/'})  //指定图片存储位置
const db = require ('../models/db_promise')
const fs = require ('fs')
const  Constant= require ('../constant/constant')



// 获取文章列表

router.get ('/', async(req,res)=>{
  let data = req.query
  // console.log(data)
  try{
    let result = await ArticleController.list(data);
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
    let result = await ArticleController.remove(id)
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
    let result = await ArticleController.update(data)
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
    let result = await ArticleController.add(data)
    res.send(result)
  }catch(e){
    console.log('/add===>>>',e.message);
    res.send(result)
  }
});   



router.post('/upload',upload.single("images"),(req,res)=>{
  console.log('upload===>>>');
  
  var imges = req.file;
    fs.readFile(imges.path,(err,data)=>{ // 写入文件
      if(err){
            console.log(err,"图片读取失败")
            return 
          }
          var imgesori = imges.originalname; // 图片名称
          var radname = Date.now()+''+parseInt(Math.random()*999) +''+parseInt(Math.random()*666) // 赋给图片的名称用时间戳+随机数获取
          var oriname = imgesori.lastIndexOf(".");
          var hzm = imgesori.substring(oriname,imgesori.length) // 图片后缀名
          var pic = radname+oriname+hzm // 拼接处一个完整的图片名称
          console.log('pic===>>>',pic);
          console.log(data)
          
          fs.writeFile(path.join(__dirname,'./uploads/'+pic),data,async(err) =>{
            if(err){
              console.log(err,"图片写入失败")
              res.send({code:99999,msg:"图片上传失败"})
              return
            }
              // 将图片的路径保存到数据库
            var picPath = "/uploads/"+pic
            
            let result={};
            try{
              let data = await db.query('INSERT INTO tb_img (img_url) VALUES (?)',picPath)
              if(data.affectedRows > 0){
                result = Constant.DEFAULT_SUCCESS
                result.msg='图片上传成功'
                result.data=picPath
                // res.send(result)
              }
              else{
                result = Constant.SEARCH_ERROR;
                result.msg='图片上传失败'

              }
              res.send(result)

            }catch(e){
              console.log('e===>>>',e);
              
            }
          })
    })
  })
  



module.exports = router;
