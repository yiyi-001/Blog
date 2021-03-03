<template>
    <div class="tag">
        <Nav></Nav>
        <Cover :title='title'></Cover>
        <com-tag></com-tag>
        <Footer></Footer>
    </div>

</template>
<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import Cover from '@/components/Cover.vue'
import ComTag from '@/components/ComTag.vue'

export default {
  name: "Tag",
  components:{
      Nav,
      Footer,
      Cover,
      ComTag,

  },
  
 data () {
    return {
       title:'Tag - 标签'
    };
  }
}
</script>
<style lang='scss' scoped>
</style>