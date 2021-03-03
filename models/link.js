
const Sequelize = require('sequelize');

const db = require('../db_sequelize');




const Link = db.define('Link', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    allowNull: false, 
    autoIncrement: true
  },
 
  site_name: {
    type: Sequelize.STRING(20), 
    allowNull: false
  },
  
  site_url: {
    type: Sequelize.STRING(50), 
    allowNull: false
  },
  
  sort_no: {
    type: Sequelize.INTEGER, 
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
  

}, {
  // 是否支持驼峰
  underscored: true,
  timestamps: false,
  // MySQL数据库表名
  tableName: 'tb_link',
});
// 导出model
module.exports = Link;