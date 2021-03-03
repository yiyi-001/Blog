
const Sequelize = require('sequelize');

const db = require('../db_sequelize');




const Comment = db.define('Comment', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    allowNull: false, 
    autoIncrement: true
  },
  article_id: {
    type: Sequelize.INTEGER, 
    allowNull: true
  },
  comment_content: {
    type: Sequelize.STRING(255), 
    allowNull: true
  },
  master_id: {
    type: Sequelize.INTEGER, 
    allowNull: true
  },
  created_by:{
    type: Sequelize.INTEGER, 
    allowNull:true
  },
  created_time: {
    type: Sequelize.DATE ,
    allowNull: true
  },
  like_count: {
    type: Sequelize.INTEGER, 
    allowNull: true
  },
  
 
  

}, {
  // 是否支持驼峰
  underscored: true,
  timestamps: false,
  // MySQL数据库表名
  tableName: 'tb_Comment',
});
// 导出model
module.exports = Comment;