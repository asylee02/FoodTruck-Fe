import axios from 'axios'
import React from 'react'

const api = axios.create({
  baseURL:' http://www.yummytruck.store'
})

export function main(lat,lng,level){
  // return api.get(`/calculate?latitude=${lat}&longitude=${lng}?distance=${level}`)
  return api.get(`/calculate?latitude=${lat}&longitude=${lng}&distance=${level}`)
}

export function infoRegister(data){
  return api.post('/storeRegister',{
    data: data
  })
}
export function menuRegister(data){
  return api.post('/itemRegister',{
    data: data
  })
}

//푸드트럭 상세페이지 API
export function truckData(id){
  return api.get(`/truck/detail/${id}`)
}

export function truckReview(id, storeno, storecontent, storerate){
  return api.post(`/truck/review`,{
    id: id,
    storeno: storeno,
    storecontent: storecontent,
    storerate: storerate
  })
}

export function truckComplain(id, storeno){
  return api.post('/truck/complain',{
    id :id,
    storeno: storeno
  })
}

export function truckGood(id, storeno){
  return api.post('/truck/good',{
    id : id,
    storeno, storeno
  })
}

export function inputAccount(id, menu){
  return api.post('/account/menu',{
    id: id,
    iteminformation: menu
  })
}

//가계부

export function accountData(id){
  return api.get(`/account/${id}`)
}

export function accountModify(id, date, menu, factor){
  return api.patch('/account/menu/modify',{
    id:id,
    date:date,
    iteminformation:menu,
    factor:factor
  })
}

export function accountDelete(id,date,menu){
  return api.delete(`account/delete?id=${id}&date=${date}&menu=${menu}`)
}


//마이페이지

export function myPageData(id){
  return api.get(`/member?id=${id}`)
}

export function myPageComplain(id){
  return api.get(`memberApi?member=${id}&option=report`)
}

export function myPageRegister(id){
  return api.get(`memberApi?member=${id}&option=register`)
}

export function myPageLike(id){
  return api.get(`memberApi?member=${id}&option=like`)
}

export function myPageLocation(id){
  return api.get(`memberApi?member=${id}&option=favorite`)
}

export function myPageLocationPost(id, lat, lng, type){
  return api.post(`/favoriteRegister?id=${id}&favoriteLatitude=${lat}&favoriteLongitude=${lng}&location_code=${type}`)
}

export function myPageUpdage(id, lat, lng, type){
  return api.post(`/favoriteUpdate?id=${id}&favoriteLatitude=${lat}&favoriteLongitude=${lng}&location_code=${type}`)
}

export function myPageNickName(id, name){
  return api.put(`/memberUpdage?id=${id}`,{
    name : name
  })
}