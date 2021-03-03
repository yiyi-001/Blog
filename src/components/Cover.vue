<template>
     	  
    <!-- cover -->
    <div id="cover">
        <div class="cover-menu">
            <i class="iconfont icon-shownav">&#xe641;</i>
		    </div>
	
		   <h1>{{title}}</h1>
    </div>


</template>
<script>
export default {
  name: "Cover",
  props:['title'],
  data () {
    return {
    };
  }
}
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/reset.scss";
    @import "@/assets/scss/cover.scss";
    

</style>