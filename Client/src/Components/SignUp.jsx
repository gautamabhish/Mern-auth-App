import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import OAuth from './OAuth.jsx'
const SignUp = () => {
  const [formData, setformData] = useState({})
  const [error , setError] = useState(false)
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();
  function handleChange(e) {
    setformData({ ...formData, [e.target.id]: e.target.value })
  }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      if(data.success === false){
        setError(true)
      }
      setLoading(false)
      // console.log(data)
      navigate('/sign-in')
    }
    // console.log(formData)
    catch (error) {
      setLoading(false)
      setError(true)

    } 
      
    }

  return (
  
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='signup-text text-3xl font-bold text-center my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 '>
        <input onChange={handleChange} type="text" placeholder='Username' id='userName' className='bg-slate-100 p-3 rounded-lg' />
        <input onChange={handleChange} type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' />
        <input onChange={handleChange} type="password" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' />
        <button disabled={loading}className='bg-slate-700 text-2xl text-white p-2 rounded-lg uppercase hover:opacity-90
        disabled:opacity-10'>{loading?"Loading...":"Sign Up"}</button>
        <OAuth></OAuth>
      </form>
      <div className='flex gap-2 my-4 mx-auto'>
        <p>Have an account ? </p>
        <Link to='/sign-in'><span className='text-blue-900'>Sign In</span></Link>
      </div>
      <p className='text-red-700 mt-5 text-xl text-center'>{error && "Something Went Wrong!"}</p>
    </div>
  )
}

export default SignUp
