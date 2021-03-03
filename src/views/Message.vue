<template>
    <div class="tag">
        <Nav></Nav>
        <Cover :title='title'></Cover>
        <com-message></com-message>
        <Footer></Footer>
    </div>

</template>
<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import Cover from '@/components/Cover.vue'
import ComMessage from '@/components/ComMessage.vue'

export default {
  name: "Tag",
  components:{
      Nav,
      Footer,
      Cover,
      ComMessage,

  },
  
 data () {
    return {
       title:'Message - 留言'
    };
  }
}
</script>
<style lang='scss' scoped>

  Footer{
    position: fixed;
    bottom: 0;
  }
</style>