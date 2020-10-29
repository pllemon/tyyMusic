import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/admin/userlist',
    method: 'get',
    params
  })
}
