const Common = require ('./common');
const Constant = require ('../constant/constant');
const date = require('moment')
const db = require ('../models/db_promise')
const dateFormat = require ('dateformat');

const Sequelize = require('sequelize');
const User = require('../models/user')
const Op = Sequelize.Op



// 配置对象
let exportObj = {
  list,
  add,
  update,
  remove,
 
};

let result = {};
let total = null;
let all = [];

// 获取用户列表 并实现分页效果
async function  list(opt){
  try{
      let num ,rows,data,start,end;
      num = +opt.page - 1 ;
      rows = +opt.rows;
      start = num*rows;
      end = num*rows + rows;
      

     if(opt.userName){
        all= []
        
        //利用sequelize 实现模糊查询
        let where = {};
        where.user_name = {
          [Op.like]:'%' + opt.userName + '%'
        }
        
        all = await User.findAll({
          order:[['id','ASC']],
          where:where,
          attributes:['id',['user_name','userName'],['user_role','rightFlag'],['user_email','email'],['created_time','regiestTime']],
          offset: start,
          limit: rows,
        })


         
      }else{
        all =await db.query(`SELECT id,user_name as userName,user_email as email,user_role as rightFlag,created_time as regiestTime FROM tb_user`);
     }
     total= all.length;        
     data = start <= total ? all.slice(start,end) : [] 

     if(data.length > 0){
          
          
          result = Constant.DEFAULT_SUCCESS
          result.data = data
          result.total = total
          return Promise.resolve(result)
      }else{
          result = Constant.DEFAULT_SUCCESS;
          result.msg = '暂无相关数据'  
          result.total = 0
          result.data = []
          return Promise.resolve(result)
      }
  }catch(err){
      result = Constant.SEARCH_ERROR;
      return Promise.reject(result)
  }
};





// 增加用户
async function  add(opt){
    let result={};
    try{
      opt.date = date(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      let data = await db.query(`INSERT INTO tb_user (user_name,user_password,user_role,user_email,created_time,user_sex) VALUES (?,?,?,?)`,[opt.userName,opt.password,opt.role,opt.email,opt.date,opt.sex]);
      if(data.affectedRows > 0){

          result = Constant.DEFAULT_SUCCESS
          result.data = data
          return Promise.resolve(result)
      }else{
          result = Constant.SEARCH_ERROR;

          return Promise.reject(result)
      }
  }catch(err){
      result = Constant.SEARCH_ERROR;
      return Promise.reject(result)
  }
};


//编辑用户
async function  update(opt){
  try{
    console.log('opt ===>>> ', opt);
    
      let data = await db.query(`UPDATE tb_user SET user_name=?,user_role=?,user_email=? WHERE id=?`, [opt.userName, opt.rightFlag, opt.email, opt.id]);

      if(data.affectedRows > 0){
          result = Constant.DEFAULT_SUCCESS
          result.data = data
          return Promise.resolve(result)
      }else{
          result = Constant.SEARCH_ERROR;

          return Promise.reject(result)
      }
  }catch(err){
      result = Constant.SEARCH_ERROR;
      return Promise.reject(result)
  }
};




//删除用户
async function  remove(id){
  try{
    let data = await db.query(`DELETE FROM tb_user WHERE id=?`, [id]);

      if(data.affectedRows > 0){
          result = Constant.DEFAULT_SUCCESS
          result.data = data
          return Promise.resolve(result)
      }else{
          result = Constant.SEARCH_ERROR;

          return Promise.reject(result)
      }
  }catch(err){
      result = Constant.SEARCH_ERROR;
      return Promise.reject(result)
  }
};




module.exports = exportObj;