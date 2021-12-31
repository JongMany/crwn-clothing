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