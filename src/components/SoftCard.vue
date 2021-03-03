<template>
    <div class="content-wrap shadow">
       
        <div class="content-pic"> <img :src="content.imgurl" alt="" ></div>
        <div class="content-title">
            <a><h2>{{content.title}}</h2></a>
            <p class="content-text">{{content.text}}</p>
            
        </div>
    </div>

</template>
<script>
export default {
  name: "SoftCard",
  props:{
      content:{
          type:Object,
          require:true,
      }
  },
  data () {
    return {
    };
  },
}
</script>
<style lang='scss' scoped>
  @import "@/assets/scss/reset.scss";
  @import "@/assets/scss/shadow.scss";
  .content-wrap{
      width: 480px;
      height:430px;
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 0px 0px 10px #dadce0;
      margin-bottom: 80px;
      .content-pic{
          img{
            width: 100%;
            height:240px;
            margin-bottom: 30px;
            border-radius: 15px 15px 0 0;
            border-bottom: 1px solid #e0e0e0;
            cursor: pointer;
          }
      }
      .content-title{
          
          a{
              cursor: pointer;
              h2{
                  margin-left:16px;
                  font-size: 22px;
              }
          }
          .content-text{
              width:420px;
              margin:16px auto;
              font-size:15px;
              text-align: justify;
              text-justify: newspaper;
              word-break: break-all;
          }
      }
   
  }

</style>