const Common = require ('./common');
const Constant = require ('../constant/constant');
const date = require('moment')

const db = require ('../models/db_promise')
const dateFormat = require ('dateformat');

const Sequelize = require('sequelize');
const Article = require('../models/article')
const Category = require('../models/category')
const User = require('../models/user')
const Op = Sequelize.Op

//关联外表实现多表查询
Article.hasMany(User, {foreignKey:'created_by'})
User.belongsTo(User,{ foreignKey: 'created_by'})

Article.hasOne(Category, {foreignKey: 'id',targetKey: 'category_id'})
Category.belongsTo(Article, { foreignKey: 'id',targetKey: 'category_id'})

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

// 获取文章列表 并实现分页效果
async function  list(opt){
  try{
      let num ,rows,data,start,end;
      num = +opt.page - 1 ;
      rows = +opt.rows;
      start = num*rows;
      end = num*rows + rows;
      
     if(opt.articleTitle){
        all= []
        
        //利用sequelize 实现模糊查询
        let where = {};
        where.article_title = {
          [Op.like]:'%' + opt.articleTitle + '%'
        }
        
        all = await Article.findAll({
          order:[['id','ASC']],
          include: [{
            model: Category,
            attributes: [['id','categoryId'],'category_name'],
            // where: { id: Article.category_id}
          }],
          where:where,
          attributes:['id',['article_title','articleTitle'],[Sequelize.col('Category.category_name'),'categoryName'],['created_time','publishDate']],
          offset: start,
          limit: rows,
        })

        
        
     }else{
        all =await db.query(`SELECT id,article_title as articleTitle,(SELECT category_name FROM tb_category WHERE id = tb_article.category_id) AS categoryName,created_time as publishDate FROM tb_article`);
       
           
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





// 增加文章
async function  add(opt){
    let result={};
    try{
      opt.date = date(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      let data = await db.query(`INSERT INTO tb_article (site_name,site_url,sort_no,created_time) VALUES (?,?,?,?)`,[opt.siteName,opt.siteUrl,opt.sortNo,opt.date]);
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


//编辑文章
async function  update(opt){
  try{
      let data = await db.query(`UPDATE tb_article SET site_name=?,site_url=?,sort_no=? WHERE id=?`, [opt.siteName, opt.siteUrl, opt.sortNo, opt.id]);

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




//删除文章
async function  remove(id){
  try{
    let data = await db.query(`DELETE FROM tb_article WHERE id=?`, [id]);

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