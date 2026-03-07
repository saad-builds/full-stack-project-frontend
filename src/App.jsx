import { useState } from 'react'
import Productform from './Components/Productform'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllProducts from './Components/AllProducts'
import UpdateProduct from './Components/UpdateProduct '

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AllProducts/>}/>
          <Route  path='/add-products'  element={<Productform/>}/>
          <Route  path='/update-product/:id'  element={<UpdateProduct/>}/>
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
