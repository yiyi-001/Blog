const Sequelize = require('sequelize');
const db = require('../db_sequelize');


const Message = db.define('Message', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    allowNull: false, 
    autoIncrement: true
  },
 
  message_content: {
    type: Sequelize.STRING(200), 
    allowNull: false
  },
  
  created_by:{
    type: Sequelize.INTEGER, 
    allowNull:true
  },
  master_id:{
    type: Sequelize.INTEGER, 
    allowNull:true
  },

  created_time:{
    type: Sequelize.DATE ,
    allowNull:true
  },


}, {
  // 是否支持驼峰
  underscored: true,
  timestamps: false,
  // MySQL数据库表名
  tableName: 'tb_message',
});
// 导出model
module.exports = Message;