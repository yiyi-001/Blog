import Request from 'src/utils/request'

export function getMessage (data) {
  return Request({
    url: '/message',
    method: 'get',
    params: data

  })
}

export function deleteMessage (data) {
  return Request({
    url: '/message/delete',
    params: data,
    method: 'get'

  })
}

export function insertMessage (data) {
  return Request({
    url: '/message/add',
    method: 'post',
    data
  })
}
