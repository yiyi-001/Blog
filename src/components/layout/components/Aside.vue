<template>
	<el-aside id="app-menu" width="200px">
		<logo :collapse="false" />
		<el-menu
			:default-active="activeMenu"
			:collapse="false"
			:unique-opened="true"
			background-color="#409eff"
			text-color="#fff"
			active-text-color="#ffd04b"
			:collapse-transition="false"
			mode="vertical">
			<span v-for="(item, index) in list" :key="index">
				<router-link :to="{ path: item.path }" class="router-link">
					<el-menu-item
						:index="item.path">

						<i class="menu-icon" :class="'iconfont '+item.icon"></i>
						<span>{{ item.title }}</span>
					</el-menu-item>
				</router-link>
			</span>
		</el-menu>
	</el-aside>
</template>

<script>
import { menuRoutes } from '@/router/routers'
import Logo from './Logo'

export default {
  components: {
    Logo
  },
  computed: {
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    list () {
      const menu = menuRoutes.map(i => {
        return {
          title: i.meta.title,
          path: i.path,
          icon: i.meta.icon
        }
      })
      return menu
    }
  }
}
</script>
<style lang="scss" scoped>
#app-menu{
  height: 100%;
  background-color: #409eff;

}

.menu-icon {
  // font-size: 19px;
  height:24px;
  width:24px;
  margin-right: 13px !important;
  color: #fff;
  // background-color: red;
}
.el-menu {
  border: none;
  .el-submenu {
    color: orange;
  }
  .el-menu-item {
    padding-left: 40px !important;
    padding-right: 0px !important;
    &:hover{
      background-color: rgba(255, 255, 255,.5) !important;

    }
  }

}
</style>
