import request from '@/utils/request'

export function examinationList(params) {
  return request({
    url: '/admin/examinationlist',
    method: 'get',
    params
  })
}

export function signUpList(data) {
  return request({
    url: '/admin/examinationsignuplist',
    method: 'post',
    data
  })
}

export function examinationinfo(params) {
  return request({
    url: '/admin/examinationinfo',
    method: 'get',
    params
  })
}

export function upDateExamination(data) {
  let url = '/admin/addexamination'
  if (data.id) {
    url = '/admin/updateexamination'
  }
  return request({
    url,
    method: 'post',
    data
  })
}