<template>
<div class="shadow classify ">
  <h2>
      <i class="iconfont">&#xe652;</i>
      <span>分类</span>
      <i class="iconfont more">&#xe6cd;</i>

  </h2>
  <ul>
      <li v-for="item in classifydata">
        <a href="">
          <span class="classify-name">{{item.name}}</span> 
          <span class="classify-number">{{item.number}}</span>
        </a>
      </li>
      
  </ul>


</div>

</template>
<script>
export default {
  name: "List",
  data () {
    return {
       classifydata:[
         {
           name:"html+css",
           number:2,
         },
         {
           name:"JavaScript",
           number:8,
         },
         {
           name:"Java",
           number:4,
         },
         {
           name:"jQuery",
           number:7,
         },
         {
           name:"Vue.js",
           number:1,
         },
         {
           name:"MySQL",
           number:2,
         },
         {
           name:"JSP",
           number:4,
         },
        
       ],
    };
  }
}
</script>
<style lang='scss' scoped>
    @import "@/assets/scss/shadow.scss";
    @import "@/assets/scss/classify.scss";
    @import "@/assets/scss/reset.scss";



</style>