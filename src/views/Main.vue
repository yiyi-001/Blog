<template>
  <div class="home">
    <Nav></Nav>
    <a id="top"></a>
    <div class="main">
        <router-view/>
    </div>
    <Footer></Footer>
    <Totop></Totop>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import Totop from '@/components/Totop.vue'

import Home from './Home.vue'



export default {
  name: 'Main',
  components: {
    Nav,
    Home,
    Footer,
    Totop,
    
  },
  // data(){
  //   return{
  //      articleData:[
  //       {
  //         title:'Linux特点',
  //         time:'2020-10-11',
  //         content:'Linux(一)Linux概述：什么是Linux？可以运行在PC机上类似于Unix风格的操作系统，由众多程序员通过Internet协作开发，Linux是开源的（open source）。 Linux系统： 1991年的10月5日，Linus',
  //         pic:'@/assets/img/index/index_pic/1.jpg'
  //       },
  //       {
  //         title:'hahaha',
  //         time:'2020-10-11',
  //         content:'Linux(一)Linux概述：什么是Linux？可以运行在PC机上类似于Unix风格的操作系统，由众多程序员通过Internet协作开发，Linux是开源的（open source）。 Linux系统： 1991年的10月5日，Linus',
  //         pic:'@/assets/img/index/index_pic/1.jpg'
  //       },
  //     ],
  //   }
  // }
}

</script>
<style lang="scss" scoped>
    @import "@/assets/scss/home.scss";
    .home{
      margin-top:90px;
      // background-color: #f5f5f7;

    }

</style>