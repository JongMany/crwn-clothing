import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ReactComponent as Logo } from '../../assets/crown.svg';
// import './header.styles.scss';
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from "./header.styles";
import { signOutStart } from "../../redux/user/user.actions";

const Header = ({currentUser,hidden, signOutStart}) => {

  return(
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer >
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/shop">CONTACT</OptionLink>
      {
        currentUser ?
        // (<OptionDiv className="option" onClick={() => auth.signOut()}> SIGN OUT</OptionDiv>)
        (<OptionLink as='div'  onClick={signOutStart}> SIGN OUT</OptionLink>)
        :
        (<OptionLink  to='/signin'> SIGN IN</OptionLink>)
      }
      <CartIcon />
    </OptionsContainer>
    {!hidden&&<CartDropdown />}
    {/* hidden?null:<CartDropdown /> */}
  </HeaderContainer>
);}

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

const mapDispatchToProps = dispatch => ({
  signOutStart : () => dispatch(signOutStart()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Header);