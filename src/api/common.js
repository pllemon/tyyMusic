import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}
export function outlogin(params) {
  return request({
    url: '/admin/outlogin',
    method: 'get',
    params
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

export function financelog(params) {
  return request({
    url: '/admin/financelog',
    method: 'get',
    params
  })
}

export function loglist(params) {
  return request({
    url: '/admin/loglist',
    method: 'get',
    params
  })
}

export function shareLoglist(params) {
  return request({
    url: '/admin/shareloglist',
    method: 'get',
    params
  })
}

export function songlist(params) {
  return request({
    url: '/admin/songlist',
    method: 'get',
    params
  })
}

export function refundOrderlist(params) {
  return request({
    url: '/admin/refundOrderlist',
    method: 'get',
    params
  })
}

export function orderPayInfo(params) {
  return request({
    url: '/admin/orderPayInfo',
    method: 'get',
    params
  })
}