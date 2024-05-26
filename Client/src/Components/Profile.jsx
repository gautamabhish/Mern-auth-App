import React from 'react'
import {useSelector} from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-4xl  font-semibold text-center my-7 '>Profile</h1>
      <form action="" className='flex flex-col gap-6 my-9'>
        <img src={currentUser.profilePicture} alt="pic" className = ' h-24 w-24 rounded-full self-center cursor-pointer object-cover' />

        <input defaultValue={currentUser.userName} type="text" id ='Username' placeholder='Username' className='bg-slate-100 rounded-lg p-3
        '/>
        <input defaultValue={currentUser.email}type="email" id ='email' placeholder='email' className='bg-slate-100 rounded-lg p-3
        '/>
        <input type="password" id ='password' placeholder='password' className='bg-slate-100 rounded-lg p-3
        '/>
          <button type='submit' className='text-blue-100 bg-slate-800 p-3 rounded-lg uppercase'> Update </button>
        <div className='flex justify-between'>
          <button type='button' className='text-red-600'>Delete Account</button>
          <button type='button' className='text-red-600'>Sign Out</button>
        
        </div>

      </form>
    </div>
  )
}

export default Profile
