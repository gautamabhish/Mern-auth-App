import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Privateprofile = () => {
    const {currentUser} = useSelector((state)=>state.user)
  return (currentUser? <Outlet/> :< Navigate to = '/sign-in'/>)
}

export default Privateprofile
