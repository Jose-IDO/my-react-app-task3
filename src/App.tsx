import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'

import { IMac, IPhone, LatestMac } from './config/files'

import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'


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

  return (
    <div id='app-container'>
      <Login isVisible={isLoginFormVisible} close={() => setShowLoginForm(false)} />
      <Register close={() => setShowRegForm(false)} isVisible={isRegFormVisible} />

      <div id='scrollable'>
        <Navbar showLoginForm={() => setShowLoginForm(true)} showRegisterForm={() => setShowRegForm(true)} />


      </div>
      <Footer />
    </div>
  )
}

export default App
