import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getDetails(params) {
  return request({
    url: '/admin/adminuserinfo',
    method: 'get',
    params
  })
}