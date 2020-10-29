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

export function trainlistpaylog(params) {
  return request({
    url: '/admin/trainlistpaylog',
    method: 'get',
    params
  })
}

export function examinationpaylog(params) {
  return request({
    url: '/admin/examinationpaylog',
    method: 'get',
    params
  })
}

export function refundorder(data) {
  return request({
    url: '/admin/refundorder',
    method: 'post',
    data
  })
}