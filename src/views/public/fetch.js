import Request from 'src/utils/request'

export function getPublic (data) {
  return Request({
    url: '/public',
    method: 'get',
    params: data

  })
}

export function deletePublic (data) {
  return Request({
    url: '/public/delete',
    params: data,
    method: 'get'

  })
}

export function updatePublic (data) {
  return Request({
    url: '/public/edit',
    method: 'post',
    data
  })
}

export function insertPublic (data) {
  return Request({
    url: '/public/add',
    method: 'post',
    data
  })
}
