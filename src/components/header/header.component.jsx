import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";

const Header = ({currentUser,hidden}) => (
  <div className="header">
    <Link to="/" className="logo-container">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">SHOP</Link>
      <Link className="option" to="/shop">CONTACT</Link>
      {
        currentUser ?
        (<div className="option" onClick={() => auth.signOut()}> SIGN OUT</div>)
        :
        (<Link className="option" to='/signin'> SIGN IN</Link>)
      }
      <CartIcon />
    </div>
    {!hidden&&<CartDropdown />}
    {/* hidden?null:<CartDropdown /> */}
  </div>
);

//객체를 반환 
/* const mapStateToProps = ({user: {currentUser}, cart :{hidden}}) => ({
  currentUser : currentUser,
  hidden : hidden,
}); */
/* const mapStateToProps = (state) => ({
  currentUser : selectCurrentUser(state),
  hidden : selectCartHidden(state),
}); */
const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);