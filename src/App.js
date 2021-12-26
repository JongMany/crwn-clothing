import React, { Component } from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import { Route, Routes } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      
      if(userAuth){//로그인한 경우에만 수행하기 위함임(userAuth가 존재하는 경우)
        const userRef = await createUserProfileDocument(userAuth); 

        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser : {
              id : snapshot.id,
              ...snapshot.data(),
            }
          });
        })
      } else{
        this.setState({
          currentUser: userAuth
        })
      }


    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      
      <div>

        <Header currentUser={this.state.currentUser} /> 

        <Routes>
          <Route exact path="/" element={<Homepage />} />  
          <Route path="/shop" element={<ShopPage />} /> 
          <Route path="/signin" element={<SignInAndSignUpPage />} /> 
        </Routes> 
        
      </div>
    );
  }
}

export default App;
