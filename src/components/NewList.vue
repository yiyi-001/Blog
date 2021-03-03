<template>
<div class="shadow newlist ">
  <h2>
      <i class="iconfont">&#xe608;</i>
      <span>最近更新</span>
      <i class="iconfont more">&#xe6cd;</i>
  </h2>
  <ul>
      <li v-for="item in list">
        <a href="">
          <span class="article">{{item.name}}</span> 
        </a>
      </li>
      
  </ul>


</div>
</template>
<script>
export default {
  name: "NewList",
  data () {
    return {
        list:[
            {
                name:"linux"
            },
            {
                name:"hahaha"
            },
            {
                name:"xixixi"
            },
            {
                name:"bilibili"
            },
            {
                name:"lalala"
            },
            {
                name:"wahaha"
            },
            {
                name:"lalala"
            },
            {
                name:"wahaha"
            },

        ],
    };
  }
}
</script>
<style lang=scss scoped>
    @import "@/assets/scss/reset.scss";
    @import "@/assets/scss/shadow.scss";
    @import "@/assets/scss/newlist.scss";


</style>