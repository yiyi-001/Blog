<template>
	<div>
		首页
	</div>
</template>

<script>
export default {
  name: 'Home',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SET_CRUMB', [
        { name: '首页', path: '/' }
      ])
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
