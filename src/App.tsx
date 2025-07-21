import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'

import { IMac, IPhone, LatestMac } from './config/files'
import { Routes, Route, useLocation, useNavigate, replace } from 'react-router'

import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Cart } from './pages/Cart'
import { ContactUs } from './pages/ContactUs'
import { Products } from './pages/Products'
import { ProductDetails } from './pages/ProductDetails'
import { Profile } from './pages/Profile'
import { ProtectedRoute } from './components/ProtectedRoute'


export type Product = {
  name: string,
  imgLink: string,
  description: string,
  price: number,
  id: number
}
function App() {
  // hooks: React functions that allow us to do something useful in our application
  // useState: allows us to set, update (maintain) states of our data. Returns an array, 0 variable, 1 func to update or set the variable
  const [count, setCount] = useState(0)
  const [stock, setStock] = useState<Product[]>([
    { name: "Mac", imgLink: IMac, description: "Just a mac", price: 21000, id: 1 },
    { name: "iPhone 7", imgLink: IPhone, description: "iPhone with high specs", price: 12300, id: 2 },
    { name: "Mac", imgLink: LatestMac, description: "Latest Mac with impressive specs", price: 31000, id: 3 },
  ])
  const [cart, setCart] = useState<Product[]>([])
  const [isLoginFormVisible, setShowLoginForm] = useState(false)
  const [isRegFormVisible, setShowRegForm] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const addToCart = (id: number) => {

  }
  const closeLoginForm = () => {
    console.log({ location });
    setShowLoginForm(false)
    if(location.search.includes('redirectTo=/profile')) {
      console.log(true);
      setShowLoginForm(false)
      navigate(location.pathname)
    } else {
      setShowLoginForm(false)
    }
    
  }
  return (
    <div id='app-container'>
      <Login isVisible={isLoginFormVisible} close={() => closeLoginForm()} />
      <Register close={() => setShowRegForm(false)} isVisible={isRegFormVisible} />

      <div id='scrollable'>
        <Navbar showLoginForm={() => setShowLoginForm(true)} showRegisterForm={() => setShowRegForm(true)} />
        <Routes>
          <Route index element={<Home stock={stock} addToCart={addToCart} showLogin={() => setShowLoginForm(true)} />} />
          <Route path='cart' element={<Cart />} />
          <Route path='contact-us' element={<ContactUs />} />
          <Route path='products'>
            <Route index element={<Products stock={stock} addToCart={addToCart} />} />
            <Route path=':id' element={<ProductDetails stock={stock} addToCart={addToCart} />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>

      </div>
      <Footer />
    </div>
  )
}

export default App
