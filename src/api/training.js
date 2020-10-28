import request from '@/utils/request'

export function trainList(params) {
  return request({
    url: '/admin/trainlist',
    method: 'get',
    params
  })
}

export function signUpList(params) {
  return request({
    url: '/admin/trainsignuplist',
    method: 'get',
    params
  })
}

export function traininfo(params) {
  return request({
    url: '/admin/traininfo',
    method: 'get',
    params
  })
}

export function upDateTrain(data) {
  let url = '/admin/addtrain'
  if (data.train_id) {
    url = '/admin/updatetrain'
  }
  return request({
    url,
    method: 'post',
    data
  })
}