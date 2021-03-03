<template>
	<el-container id="app-wrapper">
		<Aside />
		<el-container>
			<el-header id="app-header" height="50px">
				<Header />
			</el-header>
			<el-main id="app-main">
				<keep-alive :include="includeViews">
					<router-view :key="key" />
				</keep-alive>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import Aside from './components/Aside'
import Header from './components/Header'

export default {
  name: 'Layout',
  components: {
    Aside,
    Header
  },
  data () {
    return {
      includeViews: []
    }
  },
  computed: {
    key () {
      return this.$route.path
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
#app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  #app-header{
    background-color: #d9ecff;

  }
  #app-main{
    padding: 15;
  }
}

</style>
