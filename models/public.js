// 引入Sequelize模块
const Sequelize = require('sequelize');
// 引入数据库实例
const db = require('../db_sequelize');
// 定义model

const Public = db.define('Public', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    allowNull: false, 
    autoIncrement: true
  },
 
  public_content: {
    type: Sequelize.STRING(200), 
    allowNull: false
  },
  
  created_by: {
    type: Sequelize.INTEGER, 
    allowNull: true
  },
  
  created_time:{
    type: Sequelize.DATE ,
    allowNull:true
  }

}, {
  // 是否支持驼峰
  underscored: true,
  timestamps: false,
  // MySQL数据库表名
  tableName: 'tb_public',
});
// 导出model
module.exports = Public;