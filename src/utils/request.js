import axios from 'axios'

export class RequestError extends Error {
  constructor (message) {
    super()
    this.message = message
    this.name = this.constructor.name
  }
}
const isProd = process.env.NODE_ENV === 'production'

// 在类上定义默认值
axios.defaults.headers['Content-Type'] = 'application/json'
// 接口请求是否绕过300ms内不可重复请求。开启时，请确认代码的可用性。
axios.defaults.unique = false

// 创建axios实例
const service = axios.create({
  baseURL: '/api',
  // 请求超时时间
  timeout: 15000
})

// 请求缓存
const requestKey = {}

// 获取请求内容字符串
const generateDataStr = config => {
  const { method, data, params } = config
  let dataStr = ''
  if (method === 'get' && params) {
    dataStr = typeof params !== 'string' ? JSON.stringify(params) : params
  }
  if (method === 'post' && data) {
    dataStr = typeof data !== 'string' ? JSON.stringify(data) : data
  }
  return dataStr
}

/**
 * 对url进行容错
 * @param host 域名 https://a.com/ 或者 https://a.com
 * @param path 相对路径 /a/b/c 或者 a/b/c
 * @returns {string} https://a.com/b/c 或者 /api/a/b/c
 * @source https://github.com/axios/axios/blob/master/lib/helpers/combineURLs.js
 */
const formatURL = (host, path) => (isProd ? host.replace(/\/+$/, '') : '') + '/' + path.replace(/^\/+/, '')

// request拦截器
service.interceptors.request.use(config => {
  // 如果当前网络有问题，直接报错
  if (!window.navigator.onLine) {
    throw new RequestError('请检查您的网络情况')
  }
  // 清除多余数据
  Object.keys(requestKey).forEach(item => {
    const { isResponse, timestamp } = requestKey[item]
    if (isResponse && Date.now() - timestamp >= 300) {
      delete requestKey[item]
    }
  })
  // 阻止频繁请求和重复请求
  const { method, url, data, baseURL, unique } = config
  const dataStr = generateDataStr(config)
  let URL = formatURL(baseURL, url)
  URL = URL.replace(/^\/api/, '')
  const hash = `${method}${URL}${dataStr}${unique ? Math.random() : ''}`
  // 重复请求
  if (requestKey[hash]) {
    const { timestamp, isResponse, method, url } = requestKey[hash]
    // 距离上次请求不足300毫秒
    if (Date.now() - timestamp < 300) {
      console.warn('请求过于频繁', method, url)
      throw new RequestError('请求过于频繁')
    }
    // 请求尚未返回
    if (!isResponse) {
      console.warn('请勿重复提交', method, url)
      throw new RequestError('请勿重复提交')
    }
  }

  requestKey[hash] = {
    method,
    url,
    data,
    isResponse: false,
    timestamp: Date.now()
  }

  config.headers = {
    ...config.headers,
    Authorization: 'Bearer ' + localStorage.getItem('EPA_USER_TOKEN'),
    'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
  }
  return config
}, error => {
  throw new RequestError(error)
})

// response拦截器
service.interceptors.response.use(response => {
  // 如果请求返回，对应的requestKey.isResponse设置为true
  const { method, url } = response.config
  const dataStr = generateDataStr(response.config)
  // const URL = url.replace(/^\/api/, '')
  const hash = `${method}${url}${dataStr}`
  if (requestKey[hash]) {
    requestKey[hash].isResponse = true
  }
  // return response.data

  const { code, msg } = response.data
  // console.log(response.data.replace(/&#34;/g, '"'))

  if (code === 10000) {
    return response.data
  }
  return Promise.reject(new RequestError(msg))
}, error => {
  // 自定义错误类直接抛出
  if (error instanceof RequestError) {
    throw error
  } else {
    const { msg } = error.response.data
    // 如果请求返回，无论错误失败，对应的requestKey.isResponse设置为true
    const { config: { method, url } } = error
    const dataStr = generateDataStr(error.config)
    const URL = url.replace(/^\/api/, '')
    const hash = `${method}${URL}${dataStr}`
    if (requestKey[hash]) {
      requestKey[hash].isResponse = true
    }
    // 处理HTTP 错误 如404
    throw new RequestError(msg)
  }
})

export default service
