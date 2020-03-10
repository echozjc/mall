import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:'/api/wh/home/data',
    params:{
      type,
      page
    }
  })
}

let num1 = [];
const num2 = [1,2,3,4,5]
for(let n of num2){
  num1.push(n);
}
