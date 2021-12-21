import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Route, Routes} from 'react-router-dom';
import ShopPage from './components/shop/shop.component';
import Header from './components/header/header.component';

function App() {
  return (
    <div> 
      <Header />
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='shop' element={<ShopPage/>} />
      </Routes>
    </div>
  );
}

export default App;
