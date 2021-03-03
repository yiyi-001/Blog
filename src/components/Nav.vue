<template>

      <!-- //导航栏// -->
      <header id="header_fixed">
        <a class="linkToHome" href="/">Welcome to Blog</a>
        <nav class="nav-link">
              <ul class="nav_list">
                  <li v-for="item in menu">
                      <a :href="item.path">
                          <i :class="'iconfont '+item.icon"></i>
                          <span>{{item.label}}</span>
                      </a>
                  </li>
              </ul>
        </nav>
        <div class="nav-right">
            <a href="javascript:void(0)" v-for='i in right'>
                <i :class="'iconfont '+i.icon"></i>
                <span>{{i.label}}</span>
                </a>
            
            <!-- <a href="login.html">
                <i class="iconfont ">&#xe62d;</i>
                <span>登录</span>
            </a> -->
        </div>

        <div class="nav-search">
            <input type="text" placeholder="请输入搜索关键词" class="search-box" id="search">
            <i class="iconfont ">&#xe617;</i>
        </div>

      </header> 

</template>
<script>
export default {
  name: "Nav",
  data () {
    return {
        menu:[
          {
             path:'/',
             label:'首页',
             name:"home",
             icon:'iconshouye',
          },
          {
             path:'/tag',
             label:'标签',
             name:"tag",
             icon:'iconbiaoqian',
          },
          {
             path:'/soft',
             label:'软件',
             name:"soft",
             icon:'icondaima',
          },
          {
             path:'/tool',
             label:'工具',
             name:"tool",
             icon:'icongongju1',
          },
          {
             path:'/link',
             label:'友链',
             name:"link",
             icon:'iconlianjie2',
          },
          {
             path:'/message',
             label:'留言',
             name:"message",
             icon:'iconliuyan2',
          },
        ],
        right:[
          {
             path:'',
             label:'',
             name:"search",
             icon:'iconsousuo2',
          },
          {
             path:'/login',
             label:'登录',
             name:"login",
             icon:'iconhoutaiguanli',
          },

        ]
    };
  },
}
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/nav.scss";
    @import "@/assets/scss/reset.scss";


</style>