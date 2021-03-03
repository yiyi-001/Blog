<template>
    <div class="tag">
        <Nav></Nav>
        <Cover :title='title'></Cover>
        <div id="content">
            <com-link></com-link>
            <com-link></com-link>
            <com-link></com-link>
            <com-link></com-link>
            <com-link></com-link>
            <com-link></com-link>
            <com-link></com-link>
            <com-link></com-link>
            <com-link></com-link>            

        </div>
        <Footer></Footer>
    </div>

</template>
<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import Cover from '@/components/Cover.vue'
import ComLink from '@/components/ComLink.vue'

export default {
  name: "Tag",
  components:{
      Nav,
      Footer,
      Cover,
      ComLink,

  },
  
 data () {
    return {
       title:'Link - 友链'
    };
  }
}
</script>
<style lang='scss' scoped>
    #content{
        z-index: 30;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width:1000px;
        margin:-160px auto 0px;
    }
    Footer{
        position:fixed;
        bottom: 0;
    }
</style>