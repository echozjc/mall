export default {
  addCart(context,payload){
    //payload新添加的商品判断
    for(let item of context.state.cartList){
      if(item.iid === payload.iid){
        // item.count += 1;
        context.commit('addCount',item)
        return;
      }
    }
    payload.count = 1;
    context.commit('addToCart',payload);
  }
}