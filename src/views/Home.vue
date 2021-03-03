<template>
  <div class="home">
    <!-- <Nav></Nav> -->
    <div id="content-wrap">
       <!-- 左侧 -->
        <div class="content-left-side">
          <notice></notice>
          <Article></Article>
          <Article></Article>
          <Article></Article>
          <Article></Article>
          <Article></Article> 
           <Page
          :num="num"
          :page="page"
          @current-change="(val) => { 
           page = val;
            list();
          }"
          ></Page>

        </div>
  
       <!-- 右侧 -->
        <div class="content-right-side">
          <card></card>
          <new-list></new-list>
          <classify></classify>
         

        </div>
    

    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import Notice from '@/components/Notice.vue'
import Classify from '@/components/Classify.vue'
import NewList from  '@/components/NewList.vue'
import Article from '@/components/Article.vue'
import Card from '@/components/Card.vue'
import Footer from '@/components/Footer.vue'
import Page from '@/components/Page.vue'




export default {
  name: 'Home',
  data() {
    return {
      page:"1",  //当前页码
      num: 15,   //内容总条数
    };
  },
  methods: {
    list() {
        //发送的http请求  
        //后端返回的总页数等于num
    },
  },
  mounted() {
    this.news();
  },
  components: {
    Nav,
    Notice,
    Classify,
    NewList,
    Article,
    Card,
    Footer,
    Page,
  },

}

</script>
<style lang="scss" scoped>
    @import "@/assets/scss/home.scss";
    .home{
      margin-top:90px;
      // background-color: #f5f5f7;

    }

</style>