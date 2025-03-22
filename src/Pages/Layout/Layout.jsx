import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if(!token){
      navigate('/')
    }
  },[])
  return (
    <div>
      <Outlet/>
    </div>
  )
}
