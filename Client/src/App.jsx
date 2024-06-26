import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Components/Home.jsx"
import About from "./Components/About.jsx"
import Profile from "./Components/Profile.jsx"
import SignIn from "./Components/SignIn.jsx"
import SignUp from "./Components/SignUp.jsx"
import Header from './Components/header.jsx'
import Privateprofile from './Components/Privateprofile.jsx'

const App = () => {
  return (
    <BrowserRouter>
    {/* header */}
    <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route element = {<Privateprofile/>}>
          <Route path = '/profile' element = {<Profile/>}></Route>
        </Route>
      </Routes>


    </BrowserRouter>
        )
}
export default App
