import Request from 'src/utils/request'

export function getComment (data) {
  return Request({
    url: '/comment',
    method: 'get',
    params: data

  })
}

export function deleteComment (data) {
  return Request({
    url: '/comment/delete',
    params: data,
    method: 'get'

  })
}

export function updateComment (data) {
  return Request({
    url: '/comment/edit',
    method: 'post',
    data
  })
}

export function insertComment (data) {
  return Request({
    url: '/comment/add',
    method: 'post',
    data
  })
}
