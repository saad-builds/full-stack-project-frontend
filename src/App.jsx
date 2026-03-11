import { useState } from 'react'
import Productform from './Components/Productform'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllProducts from './Components/AllProducts'
import UpdateProduct from './Components/UpdateProduct '
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AllProducts/>}/>
          <Route  path='/add-products'  element={<Productform/>}/>
          <Route  path='/update-product/:id'  element={<UpdateProduct/>}/>
          <Route  path='/register'  element={<Register/>}/>
          <Route  path='/login'  element={<Login/>}/>
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
