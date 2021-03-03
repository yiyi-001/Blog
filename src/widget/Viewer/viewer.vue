
<template>
	<ul ref="images">
		<li v-for="(item,idx) in list" :key="idx">
			<img :src="item[itemKey]" alt="图片">
		</li>
	</ul>
</template>

<script>
import Viewer from 'viewer'
export default {
  name: 'ImagesView',
  props: {
    list: Array,
    itemKey: String,
    index: Number
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const viewer = new Viewer(this.$refs.images, {
        show: function () {
          viewer.update()
        },
        hide: function () { // 在图片消失的时候销毁viewer
          viewer.destroy()
        },
        zIndex: 100000
      })
      viewer.view(this.index)
    }
  }
}
</script>

<style>

</style>
