import React,{Component} from 'react';
import {toggleCartHidden} from '../../redux/cart/cart.actions'

import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({toggleCartHidden, itemCount}) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className='item-count'> {itemCount} </span>
  </div>
)

/* const mapStateToProps = ({cart : {cartItems}}) => ({
  itemCount : cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity 
  ,0)
}); */

const mapStateToProps = (state) => ({
  itemCount : selectCartItemsCount(state),
})

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden : ()=>{dispatch(toggleCartHidden())}
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);