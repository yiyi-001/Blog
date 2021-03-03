
const Sequelize = require('sequelize');

const db = require('../db_sequelize');




const ArticleContent = db.define('ArticleContent', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    allowNull: false, 
    autoIncrement: true
  },
 
  article_cotent: {
    type: Sequelize.TEXT, 
    allowNull: false
  },
  created_time: {
    type: Sequelize.DATE ,
    allowNull: true
  },
  created_by:{
    type: Sequelize.INTEGER, 
    allowNull:true
  },
  update_time: {
    type: Sequelize.DATE ,
    allowNull: true
  },

}, {
  // 是否支持驼峰
  underscored: true,
  timestamps: false,
  // MySQL数据库表名
  tableName: 'tb_article_content',
});
// 导出model
module.exports = ArticleContent;