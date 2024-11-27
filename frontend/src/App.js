import React from 'react'
import Landingpage from './pages/Landingpage'
import './App.css'
import Home from './pages/Home'
import Admin from './pages/Admin'
import { ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import Productoverview from './pages/Productoverview'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Liked from './pages/Liked'
import AddAdmin from './pages/AddAdmin'
import Orders from './pages/Orders'
import Checkoutpage from './pages/Checkoutpage'
import Userorders from './pages/Userorders'
const App = () => {
  return (
    <Routes>
    <Route path='/' element={<Landingpage/>}/>
    <Route  path='/home' element={ <Home/>}/>
    <Route path='/Admin/create' element={ <Admin/>}/>
    <Route path='/Product/:id' element={ <Productoverview/>}/>
    <Route path='/Register' element={<Register/>}></Route>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Cart' element={<Cart/>}/>
    <Route path='/Liked' element={<Liked/>}/>
    <Route path='/Admin/New/admin' element={<AddAdmin/>}/>
    <Route path='/Admin/Oreders/view' element={<Orders/>}/>
    <Route path='/product/checkout' element={<Checkoutpage/>}/>
    <Route path='/Orders' element={<Userorders/>}/>
    </Routes>
  )
}

export default App