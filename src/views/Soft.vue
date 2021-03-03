<template>
    <div class="soft">
        <Cover :title="title"></Cover>
        <Nav></Nav>
        <div id="content">
            <soft-card v-for='(item,index) in contentText' :key="index" :content='item'></soft-card>
           

        </div>

        <Footer></Footer>


    </div>
</template>
<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import Cover from '@/components/Cover.vue'
import Totop from '@/components/Totop.vue'
import SoftCard from '@/components/SoftCard.vue'


export default {
  components: { 
      Nav,
      Footer,
      Cover,
      Totop,
      SoftCard,

  },
  name: "Soft",
  data () {
    return {
        title:"Software - 软件",
        contentText:[
            {
                title:'「Eagle」图片管理 从未如此简单',
                imgurl:require('@/assets/img/tools/eagle.jpg'),
                text:'图片设计收藏、素材整理、图库管理软件，作为整理工具，Eagle用文件夹和标签作为基本分类方式，提供多种筛选、排序、搜索和智能文件夹方式为辅，功能多而不杂，可以按照使用习惯自定义分类，基本不存在学习成本。',
            },
            {
                title:'「CoolHue」，好看的渐变色',
                imgurl:require('@/assets/img/tools/color.jpg'),
                text:'渐变配色在一些 UI 设计上已经流行，自己调的渐变不好看？收集了一些在线的渐变生成和下载网站，拥有强大的编辑功能，还有很多现成的模板可以下载，对于不善于配色的同学可以说是非常实用的。',
            },
            {
                title:'「Snipaste」相见恨晚截图软件',
                imgurl:require('@/assets/img/tools/Snipaste.jpg'),
                text:'Snipaste让你的工作效率得到提升！不仅仅是一个截图工具更像是一个图片处理工具，截图范围精准把控，自动识别范围，标注功能丰富强大，带有取色功能不放个任何一个色彩。',
            },
            {
                title:'「智图」腾讯出品的图片压缩软件',
                imgurl:require('@/assets/img/tools/pic.png'),
                text:'别智图是腾讯ISUX前端团队开发的一个专门用于图片压缩和图片格式转换的平台，主要用于针对png,jpeg,gif等各类格式图片的压缩，还会为用户转换一份webp格式的图片。',
            },

        ]
    };
  }
}
</script>
<style lang='scss' scoped>

    @import "@/assets/scss/reset.scss";

    #content{
        z-index: 30;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width:1000px;
        // height: 1168px;
        margin:-150px auto 0px;
    }
</style>