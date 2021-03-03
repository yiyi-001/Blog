import Request from 'src/utils/request'

export function getCategory (data) {
  return Request({
    url: '/category',
    method: 'get',
    params: data

  })
}

export function deleteCategory (data) {
  return Request({
    url: '/category/delete',
    params: data,
    method: 'get'

  })
}

export function updateCategory (data) {
  return Request({
    url: '/category/edit',
    method: 'post',
    data
  })
}

export function insertCategory (data) {
  return Request({
    url: '/category/add',
    method: 'post',
    data
  })
}
