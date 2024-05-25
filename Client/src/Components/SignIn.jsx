import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import {signInStart,signInSuccess ,signInFailure} from'../redux/user/userSlice.js'
import {useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import OAuth from './OAuth.jsx'

const SignIn = () => {
  const [formData, setformData] = useState({})
  const {currentUser,loading , error} =useSelector((state) =>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  function handleChange(e) {
    setformData({ ...formData, [e.target.id]: e.target.value })
  }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
     dispatch(signInStart())
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      if(data.success === false){
        dispatch(signInFailure(data))
        return;
      }
      // console.log(data)
      dispatch(
        signInSuccess(data)
      )
      navigate('/')
      
    }
    // console.log(formData)
    catch (error) {
      dispatch(signInFailure(error)
       ) } 
      
    }

  return (
  
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='signin-text text-3xl font-bold text-center my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 '>
        <input onChange={handleChange} type="email" placeholder='Email (example@mail.com)' id='email' className='bg-slate-100 p-3 rounded-lg' />
        <input onChange={handleChange} type="password" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' />
        <button disabled={loading}className='bg-slate-700 text-2xl text-white p-2 rounded-lg uppercase hover:opacity-90
        disabled:opacity-10'>{loading?"Loading...":"Sign In"}</button>
        <OAuth></OAuth>
      </form>
      <div className='flex gap-2 my-4 mx-auto'>
        <p>New User ? </p>
        <Link to='/sign-up'><span className='text-blue-900'>Sign Up</span></Link>
      </div>
      <p className='text-red-700 mt-5'>{ error?error.message || "Something Went Wrong!":''}</p>
    </div>
  )
}

export default SignIn