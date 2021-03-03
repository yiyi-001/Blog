const fs = require('fs')
// const { reject } = require('lodash')
const path = require('path');
// const { resourceUsage } = require('process');


// let data = require('../data.json')
const db = require('./db_promise')

class SafeRequest{
    constructor(){}
    getData(){
        return db.query(`SELECT * FROM tb_book`);
       
    }

    
    // 添加数据
    async addData(opt){
        let result = {
            code:0,
            message:'',
            data:[]
        }

        try{
          let data = await db.query(`INSERT INTO tb_book SET ?`,opt);
          if(data.affectedRows >0){
              result.message = '添加成功'
              return Promise.resolve(result)
          }else{
            result.message = '添加失败'
            result.code = 1
            return Promise.reject(result)

          }
        }catch(err){
            result.message = '添加失败'
            result.code = 1
            result.status = 500
            return Promise.reject(result)

        }
        
       
    }

    //修改获取到的图书数据
    async getEditData(id){
        let result = {
            code:0,
            message:'',
            data:[]
        }

        try{
          let data = await db.query(`SELECT * FROM tb_book WHERE id=?`,[id]);
          if(data.length > 0){
              result.message = '获取成功'
              result.data = data[0]
              return Promise.resolve(result)
          }else{
            result.message = '获取失败'
            result.code = 1
            return Promise.reject(result)

          }
        }catch(err){
            result.message = '获取失败'
            result.code = 1
            result.status = 500
            return Promise.reject(result)

        }



       
    }



    //完成修改
    async editData(opt){

        let result = {
            code:0,
            message:'',
            data:[]
        }

        try{
            console.log('opt ===>>>',opt);
            let data = await db.query(`UPDATE tb_book SET name=?,author=?,category=?,description=? WHERE id=?`, [opt.name, opt.author, opt.category, opt.desc, opt.id]);
            // console.log('data',data);
            if(data.affectedRows > 0){
                result.message = '修改成功';

                return Promise.resolve(result)
            }else{
                result.message = '修改失败'
                result.code = 1

                return Promise.reject(result)
            }

           
            // console.log('data ====>>>>', data);
            
        }catch(err){
            // console.log('err ====>>>>', err);
            result.message = '修改失败'
            result.code = 1
            result.status = 500

            return Promise.reject(result)
        }


    
    }


    //删除图书
    async deleteData(id){
        
        let result = {
            code: 0,
            data: [],
            message: ''
        }
        // console.log(' ====>>>>', opt);
        
        try{
            let data = await db.query(`DELETE FROM tb_book WHERE id=?`, [id]);

            if(data.affectedRows > 0){
                result.message = '删除成功';

                return Promise.resolve(result)
            }else{
                result.message = '删除失败'
                result.code = 1

                return Promise.reject(result)
            }

           
            // console.log('data ====>>>>', data);
            
        }catch(err){
            // console.log('err ====>>>>', err);
            result.message = '删除失败'
            result.code = 1
            result.status = 500

            return Promise.reject(result)
        }


        
    }



    //获取友情链接
    async getLinkData(){
        let result = {
            code: 0,
            message: '',
            data: []
        }
        try{
            let data = await db.query(`SELECT id,site_name as siteName,site_url as siteUrl,sort_no as sortNo,created_time as updatedTime FROM tb_link`);
            console.log('data',data);
            

            if(data.length > 0){
                result.message = '查询成功';
                result.data = data

                return Promise.resolve(result)
            }else{
                result.message = '查询失败'
                result.code = 1

                return Promise.reject(result)
            }

           
            // console.log('data ====>>>>', data);
            
        }catch(err){
            // console.log('err ====>>>>', err);
            result.message = '查询失败'
            result.code = 1
            result.status = 500

            return Promise.reject(result)
        }
        
    }

}



module.exports=SafeRequest