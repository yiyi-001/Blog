<template>
	<div class="header-container">
		<span>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item v-for="(item,index) in crumb" :key="index" :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
			</el-breadcrumb>
		</span>
		<span class="exit">
			退出登录
		</span>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters(['crumb'])
  }
}
</script>

<style lang="scss" scoped>
.header-container{
  height: 100%;
  background-color: #d9ecff;
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.exit{
	color:#409eff;
	cursor: pointer;
}
</style>
