import Request from 'src/utils/request'

export function getLink (data) {
  return Request({
    url: '/link',
    method: 'get',
    params: data

  })
}

export function deleteLinks (data) {
  return Request({
    url: '/link/delete',
    params: data,
    method: 'get'

  })
}

export function updateLinks (data) {
  return Request({
    url: '/link/edit',
    method: 'post',
    data
  })
}

export function insertLinks (data) {
  return Request({
    url: '/link/add',
    method: 'post',
    data
  })
}
