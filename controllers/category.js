const Common = require ('./common');
const Constant = require ('../constant/constant');
const date = require('moment')

const db = require ('../models/db_promise')
const dateFormat = require ('dateformat');


const Sequelize = require('sequelize');
const Category = require('../models/category')
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

// 获取分类列表 并实现分页效果
async function  list(opt){
  try{
      let num ,rows,data,start,end;
      num = +opt.page - 1 ;
      rows = +opt.rows;
      start = num*rows;
      end = num*rows + rows;
      
     if(opt.categoryName){
    
        let where = {};
        where.category_name = {
          [Op.like]:'%' + opt.categoryName + '%'
        }
        
        all = await Category.findAll({
          order:[['id','ASC']],
          where:where,
          attributes:['id',['category_name','categoryName'],['category_description','categoryDesc'],['category_num','categoryNum']],
          offset: start,
          limit: rows,

        })
    
    
    }else{
        all =await db.query(`SELECT id,category_name as categoryName,category_description as categoryDesc,category_num as categoryNum FROM tb_category`);
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





// 增加分类
async function  add(opt){
    let result={};
    try{
      opt.date = date(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      opt.num = 0
      let data = await db.query(`INSERT INTO tb_category (category_name,category_description,category_num,created_time) VALUES (?,?,?,?)`,[opt.categoryName,opt.categoryDesc,opt.num,opt.date]);
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


//编辑分类
async function  update(opt){
  try{
    
      let data = await db.query(`UPDATE tb_category SET category_name=?,category_description=? WHERE id=?`, [opt.categoryName, opt.categoryDesc, opt.id]);
      
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




//删除分类
async function remove(id){
  try{
    let data = await db.query(`DELETE FROM tb_category WHERE id=?`, [id]);

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