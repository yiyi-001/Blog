import Request from 'src/utils/request'

export function getArticle (data) {
  return Request({
    url: '/article',
    method: 'get',
    params: data

  })
}

export function deleteArticle (data) {
  return Request({
    url: '/article/delete',
    params: data,
    method: 'get'

  })
}

export function updateArticle (data) {
  return Request({
    url: '/article/edit',
    method: 'post',
    data
  })
}

export function insertArticle (data) {
  return Request({
    url: '/article/add',
    method: 'post',
    data
  })
}
