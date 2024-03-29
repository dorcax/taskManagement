import React,{useState,useRef,useEffect} from 'react'
import Sidebar from './Sidebar'
import {Outlet} from"react-router-dom"


const Layout = () => {
  const[open,setOpen] =useState(false)
  const ToggleMenu =()=>{
    setOpen(!open)
  }
   // function of click  outside of bar
  let menuref =useRef()
useEffect(()=>{
  const handler =(e)=>{
    if(!menuref.current.contains(e.target)){
      setOpen(false)
    }
document.addEventListener("mousedown",handler)
  }
  return ()=>{
    document.addEventListener("mousedown",handler)
  }
})
  // function of click  outside of bar
  return (
    <div  className='flex relative'>
      
        <Sidebar/>
        <main className='flex my-10 lg:pl-64  lg:mx-10  w-full sm:pl-0  sm:mx-6   '>
        <div className='lg:hidden absolute left-[10px] top-[90px]  z-[100]'>
          <button  className="text-4xl " onClick={ToggleMenu}>{open?<i class="fas fa-bars"></i>:<i class="fas fa-bars"></i>}</button>
         <div ref={menuref}>  {open && <Sidebar open={open} ToggleMenu={ToggleMenu} />}</div>
        </div>
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout 