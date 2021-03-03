<template>

     <div class="card card-info ">
        <div class="info">
            <img class="info-photo" id="link-photo" src="@/assets/img/index/index_bg/4.jpg" width='140px' height='140px' alt="用户头像">
        </div>
        <p class="info-username">yiyi</p>
        <p class="info-des">只想搞钱！！！</p>
        <a href="javascript:void(0)" class="info-sth info-infomate">
            <p class="headline">文章</p>
            <p class="number">1</p>
        </a>
        <a href="javascript:void(0)" class="info-sth info-label">
            <p class="headline">标签</p>
            <p class="number">10</p>
        </a>
        <a href="javascript:void(0)" class="info-sth info-classify">
            <p class="headline">分类</p>
            <p class="number">12</p>
        </a>
    </div>

</template>
<script>


export default {
  name: "Card",
  data () {
    return {
    };
  }
}
</script>
<style lang='scss' scoped>
    @import "@/assets/scss/shadow.scss";
    @import "@/assets/scss/reset.scss";
     .card-info{
        height:380px;
        width: 100%;;
        padding-top:60px;
        text-align: center;
        .info{
                width: 140px;
                height: 140px;
                margin:0 auto;
                img{
                    display: block;
                    border-radius: 100%;
                    border: 1px solid #e0e0e0;
                    cursor: pointer;
                }
                
        }
        .info-username{
            color:#333;
            margin:25px auto;
            font-size:38px;
        }
        .info-des{
            font-size:20px;
        }
        .info-sth{
            display: inline-block;
            color:#999;
            margin:20px ;
            .headline{
                font-size:20px;
                color:#807e7d;
                margin-bottom: 5px;;
            }
            .number{
                font-size:20px;
            }
        }
        
     }

</style>