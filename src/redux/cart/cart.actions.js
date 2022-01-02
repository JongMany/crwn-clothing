import CartActionTypes from "./cart.types";

//필요한 정보를 받아서 액션 객체를 반환하는 함수

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
})

export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
})

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item,
})