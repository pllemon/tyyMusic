import request from '@/utils/request'

export function examinationList(params) {
  return request({
    url: '/admin/examinationlist',
    method: 'get',
    params
  })
}

export function signUpList(params) {
  return request({
    url: '/admin/examinationsignuplist',
    method: 'get',
    params
  })
}

export function achievementList(params) {
  return request({
    url: '/admin/achievementlist',
    method: 'get',
    params
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
  if (data.examination_id) {
    url = '/admin/updateexamination'
  }
  return request({
    url,
    method: 'post',
    data
  })
}