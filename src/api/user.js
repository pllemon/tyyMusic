import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/admin/userlist',
    method: 'get',
    params
  })
}

export function setvipuser(data) {
  return request({
    url: '/admin/setvipuser',
    method: 'post',
    data
  })
}
