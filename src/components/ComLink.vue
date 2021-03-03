<template>
    <div class="card">
        <img src="@/assets/img/link/lanka.png" alt="">
        <p class="LinkName">蓝卡</p>
        <p class="LinkDes">美好科技生活方式</p>
       
    </div>
</template>
<script>
export default {
  name: "ComLink",
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
@import'@/assets/scss/reset.scss';
@import'@/assets/scss/shadow.scss';
.card{
    width:300px;
    height:120px;
    border-radius: 8px;
    overflow: hidden;
    img{
        // display: block;
        float:left;
        width:80px;
        height: 80px;
        margin:20px 26px;
        border-radius: 50px;
    }
    .LinkName{
        font-size:22px;
        color: #222831;
        margin:20px 0 10px;
    }
    .LinkDes{
        font-size:16px;
        color: #9ca0ad;
    }
    
}
</style>