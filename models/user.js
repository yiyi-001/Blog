// 引入Sequelize模块
const Sequelize = require('sequelize');
// 引入数据库实例
const db = require('../db_sequelize');
// 定义model

const User = db.define('User', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    allowNull: false, 
    autoIncrement: true
  },
 
  user_name: {
    type: Sequelize.STRING(20), 
    allowNull: false
  },
  
  user_password: {
    type: Sequelize.STRING(20), 
    allowNull: false
  },
  
  user_role: {
    type: Sequelize.INTEGER, 
    allowNull: false
  },
  
  user_email: {
    type: Sequelize.STRING(20), 
    allowNull: false
  },
  created_time:{
    type: Sequelize.DATE ,
    allowNull:true
  },
  user_sex:{
    type: Sequelize.INTEGER, 
    allowNull:true
  }

}, {
  // 是否支持驼峰
  underscored: true,
  timestamps: false,
  // MySQL数据库表名
  tableName: 'tb_user',
});
// 导出model
module.exports = User;