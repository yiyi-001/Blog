<template>
    <footer id="ending">    
        <span>
           Copyright ©2020.10 -- by yiyi
        </span>
    </footer>

</template>
<script>
export default {
  name: "Footer",
  data () {
    return {
    };
  }
}
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/shadow.scss";
    @import "@/assets/scss/reset.scss";

    #ending{
        // position: fixed;
        // bottom:0;
        width: 100%;
        height:60px;
        margin-top:80px;
        text-align: center;
        background-color: #f6f8fa;
        line-height: 60px;
        border-top:1px solid #f1f1f1;
        box-shadow: 0px -1px 10px #e0e0e0;
        span{
            
            font-size: 16px;
          
        }
    }
    
</style>