import Request from 'src/utils/request'

export function getUser (data) {
  return Request({
    url: '/user',
    method: 'get',
    params: data

  })
}

export function deleteUser (data) {
  return Request({
    url: '/user/delete',
    params: data,
    method: 'get'

  })
}

export function updateUser (data) {
  return Request({
    url: '/user/edit',
    method: 'post',
    data
  })
}
