import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Components/Home.jsx"
import About from "./Components/About.jsx"
import Profile from "./Components/Profile.jsx"
import SignIn from "./Components/SignIn.jsx"
import SignUp from "./Components/SignUp.jsx"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/sign-up' element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
        )
}
export default App
