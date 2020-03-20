import {request} from "./request";

export function getDetail(iid) {
  return request({
    url:'api/wh/detail',
    params:{
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url:'api/wh/recommend'
  })
}

export class Goods {
  constructor(itemInfo,columns,service) {
    this.title =itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = service;
    this.realPrice =itemInfo.lowNowPrice;
  }
}
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
