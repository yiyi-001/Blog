const Common = require ('./common');
const Constant = require ('../constant/constant');
const date = require('moment')

const db = require ('../models/db_promise')
const dateFormat = require ('dateformat');
const Sequelize = require('sequelize');
const Public = require('../models/public')
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

// 获取公告列表 并实现分页效果
async function list(opt){
  try{
      let num ,rows,data,start,end;
      num = +opt.page - 1 ;
      rows = +opt.rows;
      start = num*rows;
      end = num*rows + rows;
      
     if(opt.publicTitle){
        let where = {};
        where.public_content = {
          [Op.like]:'%' + opt.publicTitle + '%'
        }
        
        all = await Public.findAll({
          order:[['id','ASC']],
          where:where,
          attributes:['id',['public_content','publicContent'],['created_time','publishDate']],
          offset: start,
          limit: rows,
        })

        
     }else{
        all =await db.query(`SELECT id,public_content AS publicContent,created_time AS publishDate,(SELECT user_name FROM tb_user WHERE id = tb_public.created_by) AS publishUser FROM tb_public`);
        // console.log(all);
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





// 增加公告
async function  add(opt){
    let result={};
    try{
      console.log('opt===>>>',opt );
      let userId = await db.query(`SELECT id FROM tb_user WHERE user_name = ?`,[opt.publishUser]);
      opt.date = date(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      opt.num = 0
      let data = await db.query(`INSERT INTO tb_public (public_content,created_time,created_by) VALUES (?,?,?)`,[opt.publicContent,opt.date,userId[0].id]);
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


//编辑公告
async function  update(opt){
  try{
     opt.date = date(Date.now()).format('YYYY-MM-DD HH:mm:ss')

      let data = await db.query(`UPDATE tb_public SET public_content=?,created_time=? WHERE id=?`, [opt.publicContent, opt.date, opt.id]);
      
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




//删除公告
async function remove(id){
  try{
    let data = await db.query(`DELETE FROM tb_public WHERE id=?`, [id]);

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