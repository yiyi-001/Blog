const Common = require ('./common');
const Constant = require ('../constant/constant');
const date = require('moment')

const db = require ('../models/db_promise')
const dateFormat = require ('dateformat');

const Sequelize = require('sequelize');
const User = require('../models/user')
const Message = require('../models/message')
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

//关联外表实现多表查询
Message.hasOne(User, {foreignKey:'created_by',targetKey: 'id'})
User.belongsTo(Message,{ foreignKey: 'created_by',targetKey: 'id'})

Message.hasOne(User, {foreignKey:'id',targetKey: 'master_id'})
User.belongsTo(Message,{ foreignKey: 'master_id',targetKey: 'id'})


// 获取留言列表 并实现分页效果
async function  list(opt){
  try{
      let result = {};

      let num ,rows,data,start,end;
      num = +opt.page - 1 ;
      rows = +opt.rows;
      start = num*rows;
      end = num*rows + rows;
      
     if(opt.messageUser){

         //利用sequelize 实现模糊查询
        //  let where = {};
        //  where.user_name = {
        //    [Op.like]:'%' + opt.messageUser + '%'
        //  }
         
        //  all = await Message.findAll({
        //    order:[['id','ASC']],
        //    include: [{
        //     model: User,
        //     attributes: [['id','user_id'],'user_name']
        //     // where: where
        //    }],
        //    where: where,
           
        //    attributes:['id',['message_content','messageContent'],[Sequelize.col('Message.created_by'),'messageUser'],[Sequelize.col('Message.master_id'),'messageMaster'],['created_time','messageTime']],
        //    offset: start,
        //    limit: rows,
        //  })
     
        //  console.log('all===>>>',all);
        let str = 'SELECT tb_message.id,tb_message.message_content,u.user_name AS messageUser,p.user_name AS messageMaster,tb_message.created_time FROM tb_message LEFT JOIN tb_user u ON tb_message.created_by = u.id LEFT JOIN tb_user p ON tb_message.master_id = p.id WHERE u.user_name LIKE '
        let sql = str.concat('%',`${opt.messageUser}`,'%')
        console.log('sql===>>>',sql);
        
        all = await db.query(sql)
        console.log('all===>>>',all);
        
       
     }else{
       let sql =`SELECT id,message_content as messageContent,(SELECT user_name FROM tb_user WHERE id = tb_message.created_by) AS messageUser,(SELECT user_name FROM tb_user WHERE id = tb_message.master_id) AS messageMaster,created_time AS messageTime FROM tb_message`
        all =await db.query(sql);
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
    
      result.total = 0
      result.data = []
      result = Constant.SEARCH_ERROR;
      return Promise.reject(result)
  }
};





// 增加留言
async function  add(opt){
    let result={};
    try{
      opt.date = date(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      opt.num = 0
      let userId = await db.query(`SELECT id FROM tb_user WHERE user_name = ?`,[opt.messageUser]);
      console.log('userID ===>>>',userId.length);
      console.log('userID ===>>>',userId.length === 0);

      if(userId.length === 0){
        console.log('用户不存在');
          
        result = Constant.SEARCH_ERROR;
        return 
      }
      console.log('opt',opt.messageMaster);
      
      let masterId = await db.query(`SELECT id FROM tb_user WHERE user_name = ?`,[opt.messageMaster]);
      let data = await db.query(`INSERT INTO tb_message (message_content,created_by,master_id,created_time) VALUES (?,?,?,?)`,[opt.messageContent,userId[0].id,masterId[0].id,opt.date]);
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


//编辑留言
async function  update(opt){
  try{
    
      let data = await db.query(`UPDATE tb_message SET message_name=?,message_description=? WHERE id=?`, [opt.messageName, opt.messageDesc, opt.id]);
      
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




//删除留言
async function remove(id){
  try{
    let data = await db.query(`DELETE FROM tb_message WHERE id=?`, [id]);

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