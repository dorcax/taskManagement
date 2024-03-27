import React,{useState} from 'react'
import Sidebar from './Sidebar'
import {Outlet} from"react-router-dom"


const Layout = () => {
  const[open,setOpen] =useState(false)
  const ToggleMenu =()=>{
    setOpen(!open)
  }
  return (
    <div  className='flex relative'>
      
        <Sidebar/>
        <main className='flex my-10 lg:pl-64  lg:mx-10  w-full sm:pl-0  sm:mx-6'>
        <div className='absolute left-[10px] top-[90px]  z-[10]'>
          <button  className="text-4xl" onClick={ToggleMenu}>{open?<i class="fas fa-bars"></i>:<i class="fas fa-bars"></i>}</button>
          {open && <Sidebar open={open} ToggleMenu={ToggleMenu}/>}
        </div>
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout 