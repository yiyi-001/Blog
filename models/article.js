
const Sequelize = require('sequelize');

const db = require('../db_sequelize');




const Article = db.define('Article', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    allowNull: false, 
    autoIncrement: true
  },
 
  article_title: {
    type: Sequelize.STRING(255), 
    allowNull: false
  },
  category_id: {
    type: Sequelize.INTEGER, 
    allowNull: true
  },
  created_time: {
    type: Sequelize.DATE ,
    allowNull: true
  },
  created_by:{
    type: Sequelize.INTEGER, 
    allowNull:true
  },
  article_content_id: {
    type: Sequelize.INTEGER, 
    allowNull: false
  },
  read_count: {
    type: Sequelize.INTEGER, 
    allowNull: false
  },
  article_source: {
    type: Sequelize.STRING(255), 
    allowNull: false
  },
  link_count: {
    type: Sequelize.INTEGER, 
    allowNull: false
  },
  comment_count: {
    type: Sequelize.INTEGER, 
    allowNull: false
  },
  

}, {
  // 是否支持驼峰
  underscored: true,
  timestamps: false,
  // MySQL数据库表名
  tableName: 'tb_article',
});
// 导出model
module.exports = Article;