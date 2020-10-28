import request from '@/utils/request'

export function trainList(data) {
  return request({
    url: '/admin/trainlist',
    method: 'post',
    data
  })
}

export function signUpList(data) {
  return request({
    url: '/admin/trainsignuplist',
    method: 'post',
    data
  })
}

export function traininfo(data) {
  return request({
    url: '/admin/traininfo',
    method: 'post',
    data
  })
}

export function upDateTrain(data) {
  let url = '/admin/addtrain'
  if (data.id) {
    url = '/admin/updatetrain'
  }
  return request({
    url,
    method: 'post',
    data
  })
}