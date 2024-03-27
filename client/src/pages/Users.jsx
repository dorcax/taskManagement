<div>
<div className={open?"w-24 bg-[#212121] fixed   h-screen border border-solid border-stone-600 rounded-lg mx-6 my-10 ":' bg-[#212121] w-72 fixed  z-[100] h-screen border border-solid border-stone-600 rounded-lg   mx-10 my-10'}>
<div className={open?" md:hidden block py-10 px-4 flex items-center justify-center":"absolute top-[35px] right-[10px]" }>
          <button  className="text-4xl" onClick={ToggleMenu}>{open?<i class="fas fa-bars"></i>:<i class="fas fa-times"></i>}</button>
        </div>
<div className='  flex flex-col justify-between  items-start h-full  lg:items-center  py-10 px-4 cursor-pointer'>
  <div className='flex gap-2 items-center '>
    <div className=''>
      <img src="/images/image2.JPG" alt="Profile" className="w-20 h-20 rounded-full" />
    </div>
    <h3 className={open?"hidden":'text-white text-xl w-20 capitalize'}>{currentUser?.name} </h3>
  {/* <div className='flex flex-end' >  {open && <i class="fas fa-times"></i>}</div> */}
  </div>
  <div className=''>
      <ul className="mt-6">
        <li className= "text-white py-5 text-xl capitalize">
          <Link to="/">
            {open ?<i className="fa-solid fa-house px-4"></i>: <div><i className="fa-solid fa-house px-4"></i>All Tasks</div>}
          </Link>
        </li>
        <li className="text-white py-5 text-xl capitalize">
          <Link to="/completed">
            {open ?<i className="fa-solid fa-check px-4"></i>:<div><i className="fa-solid fa-check px-4"></i>completed</div>}
          </Link>
        </li>
        <li className="text-white py-5 text-xl capitalize">
          <Link to="/important">
            {open ?<i className="fa-solid fa-list px-4"></i>:<div><i className="fa-solid fa-list px-4"></i>important</div> }
          </Link>
        </li>
        <li className="text-white py-5 text-xl capitalize">
          <Link to="/todo">
            {open ? <i className="fa-solid fa-list px-4"></i>:<div><i className="fa-solid fa-list px-4"></i>to do</div> }
          </Link>
        </li>
      </ul>
    </div>
   <div  className=''>     {IsAuthenticated && currentUser?<div className="text-white text-xl " onClick={logout}>
    {open? <i className="fas fa-sign-out-alt px-4"></i>: <div> <i className="fas fa-sign-out-alt px-4"></i>Sign out</div>}
 
  </div>:<div className="text-white text-xl capitalize">
   {open? <i className="fas fa-sign-out-alt px-4"></i>:<div> <i className="fas fa-sign-in-alt px-4"></i><Link to="/login">log in</Link></div>}

  </div>}</div>
</div>
{/* media queries */}

</div>
</div>