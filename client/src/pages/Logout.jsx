import React,{useRef} from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate= useNavigate()
    const logout =()=>{
        localStorage.removeItem("token")
        navigate("/login")
    }
  
  return (
    <div className='text-white text-xl' onClick={logout} > <i className="fas fa-sign-out-alt px-4"></i>Sign out</div>
  )
}

export default Logout