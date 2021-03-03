import Request from 'src/utils/request'

/**
 * 退出登录
 */
export function logoutApi () {
  return Request({
    url: '/manage/user/logout',
    method: 'post'
  })
}
