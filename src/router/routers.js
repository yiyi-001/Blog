import Layout from 'src/components/layout'

export const publicRoutes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/404',
    component: () => import('src/views/404/index')
  },
  {
    path: '/login',
    component: () => import('src/views/login/index')
  }
]

export const menuRoutes = [
  {
    path: '/home',
    component: Layout,
    meta: { title: '首页', icon: 'iconshouye' },
    children: [
      {
        path: '',
        name: '首页',
        component: () => import('src/views/home/index.vue')
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    meta: { title: '文章管理', icon: 'iconwenzhang1' },
    children: [
      {
        path: '',
        name: '文章管理',
        component: () => import('src/views/article/index.vue')
      },
      {
        path: 'add',
        name: '新增文章',
        component: () => import('src/views/article/edit.vue')
      }, {
        path: 'edit/:id(\\d+)',
        name: '文章编辑',
        component: () => import('src/views/article/edit.vue')
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    meta: { title: '文章评论', icon: 'iconpinglun' },
    children: [
      {
        path: '',
        name: '文章评论',
        component: () => import('src/views/comment/index.vue')
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    meta: { title: '留言管理', icon: 'iconliuyan2' },
    children: [
      {
        path: '',
        name: '留言管理',
        component: () => import('src/views/message/index.vue')
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    meta: { title: '分类管理', icon: 'icontag1' },
    children: [
      {
        path: '',
        name: '分类管理',
        component: () => import('src/views/category/index.vue')
      }
    ]
  },
  {
    path: '/public',
    component: Layout,
    meta: { title: '公告管理', icon: 'icongonggao1' },
    children: [
      {
        path: '',
        name: '公告管理',
        component: () => import('src/views/public/index.vue')
      }

    ]
  },
  {
    path: '/link',
    component: Layout,
    meta: { title: '友情链接', icon: 'iconlianjie2' },
    children: [
      {
        path: '',
        name: '友情链接',
        component: () => import('src/views/link/index.vue')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: { title: '用户管理', icon: 'iconyonghuguanli1' },
    children: [
      {
        path: '',
        name: '用户管理',
        component: () => import('src/views/user/index.vue')
      }
    ]
  }
]

export const routes = publicRoutes.concat(menuRoutes)
