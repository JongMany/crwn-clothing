import React from 'react';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Route, Routes } from 'react-router-dom';

const HatsPage = () => (
  <div>
    <h1>Hats Page</h1>
  </div>
)


function App() {
  return (
    <div> 
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='shop/hats' element={<HatsPage/>} />
      </Routes>
    </div>
  );
}

export default App;
