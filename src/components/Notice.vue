<template>
    <div class="notice shadow">
        <i class="iconfont">&#xe625;</i>
        <span class="notice-content">{{message}}</span>
    </div>


</template>
<script>

export default {
  name: "Notice",
  data () {
    return {
        message:'中秋国庆双节快乐！！！',
    };
  }
}


</script>
<style lang="scss" scoped>
    @import "@/assets/scss/notice.scss";
    @import "@/assets/scss/reset.scss";
    @import "@/assets/scss/shadow.scss";
   
  

</style>