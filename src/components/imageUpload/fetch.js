import Request from 'src/utils/request'

/**
 * 图片上传
 * @param {*} data
 */

export function imageUploadApi (data) {
  return Request({
    url: '/article/upload',
    method: 'post',
    data
  })
}
