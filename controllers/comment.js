const Common = require ('./common');
const Constant = require ('../constant/constant');
const date = require('moment')

const db = require ('../models/db_promise')
const dateFormat = require ('dateformat');

//引入Sequelize
const Sequelize = require('sequelize');
const Article = require('../models/article')
const Comment = require('../models/comment')
const User = require('../models/user')
const Op = Sequelize.Op

//关联外表实现多表查询
Comment.hasOne(User, {foreignKey:'created_by'})
Comment.hasOne(User, {foreignKey:'master_id'})
User.belongsTo(Comment,{ foreignKey: 'id',targetKey: 'created_by'})
User.belongsTo(Comment,{ foreignKey: 'id',targetKey: 'master_id'})

Comment.hasMany(Article, {foreignKey: 'article_id',targetKey: 'id'})
Article.belongsTo(Comment,{foreignKey: 'article_id',targetKey: 'id'})



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
      
     if(opt.article){
       console.log('article===>>>',opt.article);
       
      let where = {};
      where.article_title = {
        [Op.like]:'%' + opt.article + '%',
      },
      // where.id=Comment.articel_id

    
      
      all = await Comment.findAll({
        order:[['id','ASC']],
        include: [{
         model: Article,
         attributes: [['id','art_id'],'article_title'],
         where: where
        }],
        
       
        attributes:['id',[Sequelize.col('Article.article_title'),'article'],['comment_content','commentContent'],['created_by','commentUser'],['master_id','commentMaster'],['created_time','commentTime']],
        offset: start,
        limit: rows,
      })


      console.log('all=>>>',all);
      
      

     }else{
       all =await db.query('SELECT id,(SELECT article_title FROM tb_article WHERE id = tb_comment.article_id) AS article,comment_content as commentContent,(SELECT user_name FROM tb_user WHERE id = tb_comment.created_by) AS commentUser,(SELECT user_name FROM tb_user WHERE id = tb_comment.master_id) AS commentMaster,created_time AS commentTime FROM tb_comment');

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




// 增加评论
async function  add(opt){
  let result={};
  try{
    opt.date = date(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    opt.num = 0
    let userId = await db.query(`SELECT id FROM tb_user WHERE user_name = ?`,[opt.commentUser]);
    if(userId.length === 0){
      console.log('用户不存在');
      result = Constant.SEARCH_ERROR;
      return 
    }
    console.log('opt',opt.commentMaster);
    let masterId = await db.query(`SELECT id FROM tb_user WHERE user_name = ?`,[opt.commentMaster]);
    let articleId = await db.query(`SELECT id FROM tb_article WHERE article_title = ?`,[opt.article]);
    console.log(articleId[0].id);
    
    let data = await db.query(`INSERT INTO tb_comment (article_id,comment_content,created_by,master_id,created_time) VALUES (?,?,?,?,?)`,[articleId[0].id,opt.commentContent,userId[0].id,masterId[0].id,opt.date]);
    console.log('data===>>>',data);
    
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


//编辑评论
async function  update(opt){
  try{
      let data = await db.query(`UPDATE tb_comment SET site_name=?,site_url=?,sort_no=? WHERE id=?`, [opt.siteName, opt.siteUrl, opt.sortNo, opt.id]);

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




//删除评论
async function  remove(id){
  try{
    let data = await db.query(`DELETE FROM tb_comment WHERE id=?`, [id]);

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