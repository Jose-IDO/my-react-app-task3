import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import {Routes, Route} from 'react-router'


import { LandingPage } from './LandingPage'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ContactUs } from './pages/ContactUs'


export type Product = {
  name: string,
  imgLink: string,
  description: string,
  id: number
}
function App() {
  // hooks: React functions that allow us to do something useful in our application
  // useState: allows us to set, update (maintain) states of our data. Returns an array, 0 variable, 1 func to update or set the variable
  const [count, setCount] = useState(0)
  // const [stock, setStock] = useState<Product[]>([
  //   { name: "Mac", imgLink: IMac, description: "Just a mac", price: 21000, id: 1 },
  //   { name: "iPhone 7", imgLink: IPhone, description: "iPhone with high specs", price: 12300, id: 2 },
  //   { name: "Mac", imgLink: LatestMac, description: "Latest Mac with impressive specs", price: 31000, id: 3 },
  // ])
  const [cart, setCart] = useState<Product[]>([])
  const [isLoginFormVisible, setShowLoginForm] = useState(false)
  const [isRegFormVisible, setShowRegForm] = useState(false)

  return (
    <div id='app-container'>
      <Login isVisible={isLoginFormVisible} close={() => setShowLoginForm(false)} />
      <Register close={() => setShowRegForm(false)} isVisible={isRegFormVisible} />

      <div id='scrollable'>
        <Navbar showLoginForm={() => setShowLoginForm(true)} showRegisterForm={() => setShowRegForm(true)} />
        <Routes>
          <Route index element = {<Home showLoginForm={() => setShowLoginForm(true)} showRegisterForm={() => setShowRegForm(true)}/>} />
          <Route path = '*' element ={<NotFound />} />
          <Route path = "contact-us" element = {<ContactUs/>} />
          <Route path = "Login" element = {<Login close = {() => close()} isVisible />} />
          <Route path = "Register" element = {<Register close = {() => close()} isVisible />} />
          <Route path = "Landing-Page" element = {<LandingPage/>} />

        </Routes>


      </div>
      <Footer />
    </div>
  )
}

export default App
