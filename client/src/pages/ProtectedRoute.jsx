import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const navigate =useNavigate()

    const token =window.localStorage.getItem("token")
    useEffect(()=>{
        if(!token){
            navigate("/login")
        }

    },[token])
  return  children
  
}

export default ProtectedRoute