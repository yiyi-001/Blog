let SafeRequest = require('../models')
let safeRequest = new SafeRequest();


class IndexController{
    constructor(){}

    index(){
       
        let data ='图书馆首页'
        return async function(ctx){
            await ctx.render('index',{
                data
            });
            
        }
    }

    //获取图书列表
    actionAdmin(){
        return async function(ctx){
            let msg = await safeRequest.getData(); 
            ctx.render('admin',{
                data:msg
            })
        }
    }

    //添加图书页
    actionAddPage(){
        return async function(ctx){
            await ctx.render("addpage",{})
        }
    }
    
    //添加图书
    actionAdd(){
        return async function(ctx){
            try{
                // ctx.request.body获取post提交的数据
                // console.log('ctx.request.body===>>>',ctx.request.body);
                let msg =await safeRequest.addData(ctx.request.body)
                if(msg.code === 0){
                    ctx.redirect('/admin')
                } else {
                    ctx.body = '添加失败！！！'
                }
            }catch(err){
                console.log('===>>>',err);
            }
        }
    }

    // 编辑图书页
    actionEditPage(){
        return async function(ctx){
            // console.log('ctx.request.query===>>>',ctx.request.query);
            let id = ctx.request.query.editid
            
            try{
                let msg = await safeRequest.getEditData(id)
                console.log('msg'.msg);
                ctx.render('editpage',{
                    data:msg.data
                })

            }catch(err){
                console.log('err===>>>','err');

            }
        }

    }

    //提交修改 
    actionEdit(){
        return async function(ctx){
            
            try{
                // console.log('ctx.request.body===>>>',ctx.request.body);
                let msg = safeRequest.editData(ctx.request.body)
                console.log('msg===>',msg);
                ctx.redirect('/admin')
            }catch(err){
                console.log('err===>>>',err);
            }
        }
    }


    //删除
    actionDelete(){
        return async function(ctx){
            let id = ctx.request.query.delete
            // console.log('ctx.request.query',ctx.request.query);
           try{
            let msg = safeRequest.deleteData(id)
            ctx.redirect('/admin')

           }catch(err){
               console.log('err===>>>',err);
           }
        }
    }

    //获取友链
    getLink(){
        return async function(ctx){
            let msg = await safeRequest.getLinkData(); 
            // console.log('msg ===>>>',msg);
           
        }
    }


}


module.exports = IndexController