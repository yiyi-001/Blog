const express = require('express');
const http = require('http');
const { response} = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs')
// const multer = require('multer')

const cookieParser = require('cookie-parser');


const indexController = require('./controllers/indexController');
//用于解决跨域问题
// var cors = require("cors");   

const indexRouter = require('./routes/index');
const categoryRouter = require('./routes/category');
const articleRouter = require('./routes/article');
const linkRouter = require('./routes/link');
const userRouter = require('./routes/user');
const messageRouter = require('./routes/message');
const commentRouter = require('./routes/comment');
const publicRouter = require('./routes/public');
// const uploadRouter = require('./routes/upload');



// Token验证中间件
// const verifyMiddleware = require('./routes/middleware/verify');

let app = express();

app.use(express.json());
//body-parser 的使用
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(cookieParser());



//引入路由中间件
app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/article', articleRouter);
app.use('/link', linkRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);
app.use('/comment', commentRouter);
app.use('/public', publicRouter);
// app.use('/upload',uploadRouter)









// //获取友链
// app.get('/link', async(req,res)=>{
//   try {
//     let a = new safeRequest()
   
//     let result = await a.getLinkData();
//     // console.log(result);
//     res.send(result)
    
//   } catch (e) {
//     console.log(e)
    
//   }
  


// })







app.listen(3000,()=>{
  console.log('running===>>>3000');
  
})