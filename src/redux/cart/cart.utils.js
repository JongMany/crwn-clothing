//기존에 있던 아이템을 추가하려면 개수만 추가하고, 없었던 아이템을 추가하려면 아이템을 추가하가ㅣ
export const addItemToCart = (cartItems, cartItemToAdd)=> {
  //객체로 비교하는 것이 아닌 객체의 id로만 비교
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

  if(existingCartItem){
    return cartItems.map(cartItem => 
      cartItem.id === cartItemToAdd.id ?
      {...cartItem, quantity: cartItem.quantity + 1}:
      cartItem
    );
  }

  //처음 선택했을 때 양에 대한 속성값을 줌!
  return [...cartItems, {...cartItemToAdd, quantity: 1}]

}

//수량을 감소하는데 마지막 수량(1)인 경우 제거
export const removeItemFromCart =(cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  if(existingCartItem.quantity === 1){
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }

  return cartItems.map(
    cartItem=>
    cartItem.id === cartItemToRemove ?
    {...cartItem, quantity: cartItem.quantity -1}:
    cartItem
  );
};