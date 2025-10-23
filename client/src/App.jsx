import React from 'react'
import './App.css'
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import SignupPage from './Pages/SignupPage/SignupPage.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./Pages/Home/Home.jsx";


function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/login' element={<LoginPage />}/>
                <Route path='/signup' element={<SignupPage />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
