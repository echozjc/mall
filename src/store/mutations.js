export default {
  addCount(state,payload){
    payload.count += 1;
  },
  addToCart(state,payload){
    payload.checked = false;
    state.cartList.push(payload);
  }
}