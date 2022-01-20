import React, { Component } from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";


class App extends Component {

  componentDidMount() {
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  render() {
    return (
      <div>
        <Header />

        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/shop/*" element={<ShopPage />} />
          <Route exact path="/signin" element={this.props.currentUser ? <Navigate to="/"/> :<SignInAndSignUpPage />} />
          <Route path="/checkout" element={<CheckoutPage />}/>
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser : selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession : () => dispatch(checkUserSession()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
