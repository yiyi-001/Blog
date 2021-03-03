<template>
   <div id="toTop">
        <a href="javascript:void(0)" id="Top" name="#top"><i class="iconfont">&#xe67a;</i></a>
    </div>
</template>
<script>
export default {
  name: "Totop",
  data () {
    return {
    };
  }
}
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/reset.scss";
    @import "@/assets/scss/shadow.scss";

    #toTop{
        z-index: 23;
        position: fixed;
        bottom:68px;
        right:100px;
        width: 68px;
        height: 68px;
        text-align: center;
        line-height: 68px;
        background-color:#2196f3;
        border-radius: 100%;
        i{
            font-size: 28px;
            color:#fff;
        }
        
    }


</style>