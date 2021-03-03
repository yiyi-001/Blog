
const Sequelize = require('sequelize');

const db = require('../db_sequelize');




const Category = db.define('Category', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    allowNull: false, 
    autoIncrement: true
  },
 
  category_name: {
    type: Sequelize.STRING(20), 
    allowNull: true
  },
  category_description: {
    type: Sequelize.STRING(100), 
    allowNull: true
  },
  category_num: {
    type: Sequelize.INTEGER, 
    allowNull: true
  },
  created_time: {
    type: Sequelize.DATE ,
    allowNull: true
  },
  
  

}, {
  // 是否支持驼峰
  underscored: true,
  timestamps: false,
  // MySQL数据库表名
  tableName: 'tb_category',
});
// 导出model
module.exports = Category;