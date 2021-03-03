const Common = require ('./common');
const Constant = require ('../constant/constant');
const date = require('moment')

const db = require ('../models/db_promise')
const dateFormat = require ('dateformat');

const Sequelize = require('sequelize');
const Link = require('../models/link')
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

// 获取链接列表 并实现分页效果
async function  list(opt){
  try{
      let num ,rows,data,start,end;
      num = +opt.page - 1 ;
      rows = +opt.rows;
      start = num*rows;
      end = num*rows + rows;
      
     if(opt.siteName){
        all= []
    
        let where = {};
        where.site_name = {
          [Op.like]:'%' + opt.siteName + '%'
        }
        
        all = await Link.findAll({
          order:[['id','ASC']],
          where:where,
          attributes:['id',['site_name','siteName'],['site_url','siteUrl'],['sort_no','sortNo'],['created_time','updatedTime']],
          offset: start,
          limit: rows,
        })

        
     }else{
        all =await db.query(`SELECT id,site_name as siteName,site_url as siteUrl,sort_no as sortNo,created_time as updatedTime FROM tb_link`);
       
           
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





// 增加友链
async function  add(opt){
    let result={};
    try{
      opt.date = date(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      let data = await db.query(`INSERT INTO tb_link (site_name,site_url,sort_no,created_time) VALUES (?,?,?,?)`,[opt.siteName,opt.siteUrl,opt.sortNo,opt.date]);
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


//编辑友链
async function  update(opt){
  try{
      let data = await db.query(`UPDATE tb_link SET site_name=?,site_url=?,sort_no=? WHERE id=?`, [opt.siteName, opt.siteUrl, opt.sortNo, opt.id]);

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




//删除友链
async function  remove(id){
  try{
    let data = await db.query(`DELETE FROM tb_link WHERE id=?`, [id]);

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