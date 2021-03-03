<template>

    <div>
        <Nav></Nav>
        <Cover :title="title"></Cover>    
          <!-- content -->
        <div>
            <div id="content">
                <div class="content-tool">
                    <ul class="frame-list show" 
                    v-for="(i,sub) in listData" 
                    :key='sub'
                    v-show='isShow === sub'>
                        <li v-for="(item,index) in i" :key='index'>
                            <a href="javascript:void(0)" :class="item.name">
                                <img :src="item.img" alt="">
                                <span>{{item.label}}</span>
                            </a>
                        </li>
                    </ul>

            

                    <div class="slide">
                        
                        <div class="btn-list" id="btn-slide">
                            <span id="btn-frame" class="btn" 
                            v-for='(btn,i) in slideBtn'
                            :key='i'
                            @mouseover="showTool(i)"
                            >{{btn}}</span>
                        
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        <Footer></Footer>
    </div>

  
   

</template>
<script>

import Cover from '@/components/Cover.vue'
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: "Tool",
  components:{
      Cover,
      Nav,
      Footer
  },
  data () {
    return {
        title:"Tool - 工具",
        isShow:-1,
        listData:[
        [
            {
                name:'pic-Rect',
                label:'Rect',
                img:require('@/assets/img/tools/1.png'),
            },
            {
                name:'pic-Vue',
                label:'Vue',
                img:require('@/assets/img/tools/2.png'),
            },
            {
                name:'pic-Angular',
                label:'Angular',
                img:require('@/assets/img/tools/Angular.png'),
            },
            {
                name:'pic-Bootstrip',
                label:'Bootstrip',
                img:require('@/assets/img/tools/boots.png'),
            },
            {
                name:'pic-jQuery',
                label:'jQuery',
                img:require('@/assets/img/tools/3.png'),
            },

           
        ],

        [
            {
                name:'pic-Webpack',
                label:'Webpack',
                img:require('@/assets/img/tools/4.png'),
            },
            {
                name:'pic-Github',
                label:'Github',
                img:require('@/assets/img/tools/5.jpg'),
            },
            {
                name:'pic-WebStorm',
                label:'WebStorm',
                img:require('@/assets/img/tools/ws.png'),
            },
            {
                name:'pic-Chrome',
                label:'Chrome',
                img:require('@/assets/img/tools/6.png'),
            },
            {
                name:'pic-template',
                label:'template',
                img:require('@/assets/img/tools/template.png'),
            },
        ],
        [
            {
                name:'pic-javascript',
                label:'高级程序设计',
                img:require('@/assets/img/fun/books/2.jpg'),
            },
            {
                name:'pic-design',
                label:'模式设计',
                img:require('@/assets/img/fun/books/4.jpg'),
            },
            {
                name:'pic-ES6',
                label:'Es6入门',
                img:require('@/assets/img/fun/books/1.jpg'),
            },
            {
                name:'pic-function',
                label:'函数式编程',
                img:require('@/assets/img/fun/books/3.jpg'),
            },
        ],
        ],
        slideBtn:['框架','工具','书架'],
    };
  },
  methods:{

      showTool(index){
          this.isShow = index;
          let btn = document.getElementsByClassName("btn");
          let select = document.getElementsByClassName('selected')[0];
          select.classList.remove('selected');
          btn[index].classList.add("selected");
      },
      

  },
  mounted(){
    this.isShow = 0;  
    let btnList = document.getElementsByClassName("btn");
    btnList[this.isShow].classList.add('selected');
      
  }
}
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/reset.scss";
    @import "@/assets/scss/shadow.scss";
        
    #content{
        width:1000px;
        height: 480px;
        margin:-150px auto 0;
        background-color: #fff;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0px 0px 10px #dadce0;
        &:hover{
            z-index:23;
            top:50px;
            box-shadow:0px 0px 15px rgba(0, 0, 0, 0.4);
        }
        .content-tool{
            width:960px;
            height:280px;
            margin:80px auto;
        
            ul{
                
                display: flex;
                justify-content: space-between;
                width: 940px;
                height:100%;
                margin:0 auto;
                li{
                    cursor: pointer;
                    float: left;
                    width:118px;
                    height: 200px;
                    margin:35px;
                    a{  
                        
                        display: block;
                        text-align: center;
                        img{
                            position: relative;
                            display: block;
                            width:118px;
                            height: 118px;
                            border-radius: 100%;
                            margin-bottom: 38px;
                            border:3px solid rgba(32, 146, 237,.4);
                            box-shadow: inset 0 0 10px 1px rgba(0,0,0,.85);
                            box-sizing: border-box;
                        }
                        span{
                            font-size: 20px;
                        
                        }
                        &:hover img{
                            z-index: 20;
                            top:-10px;
                            box-shadow: 0px 0px 28px 2px rgba(0,0,0,.7);
                        }
                    
                    }

                    .pic-Rect > img{
                        background-color:#333;
                    }
                    .pic-Vue > img{
                        background-color:#eeeeee;
                    }
                    .pic-Angular > img{
                        background-color: #333;
                    }
                    .pic-Bootstrip > img{
                        background-color: #401e45;
                    }
                    .pic-jQuery > img{
                        background-color: #2a5dbd;
                    }

                    .pic-Webpack > img{
                        background-color:#eeeeee;
                    }
                    .pic-Github > img{
                        background-color:#eeeeee;
                    }
                    .pic-WebStorm > img{
                        background-color: #3f1e45;
                    }
                    .pic-Chrome > img{
                        background-color: #2a2a2a;
                    }
                }
                
            }
            
            .show{
                display:flex;
            }

            .slide{
                float: right;
                width:300px;
                height:50px;
                margin-right: 45px;
                border-radius: 80px;
                border:3px solid rgba(32, 146, 237,.5);
                box-shadow: inset 0 0 8px 1px rgba(0,0,0,.5);
                
                .btn-list{
                    width:300px;
                    line-height:50px;
                    font-size:20px;
                    margin:0 auto;
                    box-sizing: border-box;
                    .btn{
                        display: block;
                        float: left;
                        width:100px;
                        text-align: center;
                        cursor: pointer;
                    }
                    .selected{
                        color:#fff;
                        border-radius: 50px;
                        background-color:#2196f3;
                    }
                }
            }

        }

    }
    Footer{
        position: fixed;
        bottom: 0;
    }

</style>