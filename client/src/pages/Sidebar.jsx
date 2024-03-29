import React, { useContext, useState,useEffect, useRef } from 'react';
import { AuthContext } from '../Context/LoginHandlers';
import { Link, useNavigate } from 'react-router-dom';


const Sidebar = ({open,ToggleMenu}) => {
  const {IsAuthenticated,currentUser,Logout,getUser} =useContext(AuthContext)
  const[Open,setOpen] =useState(false)

  

  const navigate =useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      // Call getUser to ensure user data is fetched on refresh
      await getUser();
    };

    fetchUser();
  }, []);
const  logout =()=>{
  Logout()
  navigate("/login")
}
// function to click outside of  bar


  // endof hhamburger menu
  return ( 
    <div className='relative'>
      <div className='sm:hidden lg:block lg:bg-[#212121] lg:w-56  lg:h-screen  fixed top-0 left-0 lg:border lg:border-solid lg:border-stone-600 lg:rounded-lg   lg:mx-10 lg:my-10'>
     
      <div className='  flex flex-col justify-between  items-start h-screen    py-10 px-4 cursor-pointer'>
        <div className='flex gap-2 items-center '>
          <div className=''>
            <img src="/images/image2.JPG" alt="Profile" className="w-20 h-20 rounded-full" />
          </div>
          <h3 className='text-white text-xl w-20 capitalize'>{currentUser?.name}</h3>
    
        </div>
     
        <div>
          <ul className="mt-6 ">
            <Link to="/"> <li className="text-white py-5 text-xl capitalize "><i className="fa-solid fa-house px-4"></i>all task</li></Link>
           <Link to="/completed"> <li className="text-white py-5 text-xl capitalize "><i class="fa-solid fa-check px-4"></i>completed</li></Link>
           <Link to="important">  <li className="text-white py-5 text-xl capitalize "><i class="fa-solid fa-list px-4"></i>important</li></Link>
          
            <Link to="todo"><li className="text-white py-5 text-xl capitalize "><i class="fa-solid fa-download px-4"></i>to do</li></Link>
            
          </ul>
          
        </div>
         <div  className=''>     {IsAuthenticated && currentUser?<div className="text-white text-xl py-10" onClick={logout}>
        <i className="fas fa-sign-out-alt px-4"></i>Sign out
        </div>:<div className="text-white text-xl capitalize">
        <i className="fas fa-sign-out-alt px-4"></i><Link to="/login">log in</Link>
        </div>}</div>
      </div>
   
      
    </div>
    
      
{/* hamburger */}
<div className={open?' bg-[#212121] w-64    fixed top-0 left-0   border border-solid border-stone-600 rounded-lg  ease-in-out duration-500  sm:mx-6 my-10 z-[300]':"fixed left-[-100%]"}>
     
      <div className='  flex flex-col justify-between  items-start  h-[600px]  py-10 px-4 cursor-pointer'>
        <div className='flex gap-2 items-center '>
          {/* <div className=''>
            <img src="/images/image2.JPG" alt="Profile" className="w-20 h-20 rounded-full" />
          </div> */}
          <h3 className='text-white text-xl w-20 capitalize px-4 inline-block'>Hi {currentUser?.name?.split(" ")[0]}</h3>
        
        </div>
     
        <div>
          <ul className="mt-6 ">
            <Link to="/"> <li className="text-white py-5 text-xl capitalize "><i className="fa-solid fa-house px-4"></i>all task</li></Link>
           <Link to="/completed"> <li className="text-white py-5 text-xl capitalize "><i class="fa-solid fa-check px-4"></i>completed</li></Link>
           <Link to="important">  <li className="text-white py-5 text-xl capitalize "><i class="fa-solid fa-list px-4"></i>important</li></Link>
          
            <Link to="todo"><li className="text-white py-5 text-xl capitalize "><i class="fa-solid fa-download px-4"></i>to do</li></Link>
            
          </ul>
          
        </div>
         <div  className=''>     {IsAuthenticated && currentUser?<div className="text-white text-xl " onClick={logout}>
        <i className="fas fa-sign-out-alt px-4"></i>Sign out
        </div>:<div className="text-white text-xl capitalize">
        <i className="fas fa-sign-out-alt px-4"></i><Link to="/login">log in</Link>
        </div>}</div>
      </div>
   
      
    </div>
    

</div>
    
    
  );
};

export default Sidebar;



      