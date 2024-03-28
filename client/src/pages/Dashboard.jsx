import React, { useEffect, useState,useRef, useContext } from 'react'
import axios from"axios"
import DeleteTask from './DeleteTask'
import AddTask from './AddTask'
import EditTask from './EditTask'
import { TaskContext } from '../Context/TaskContext'

import { AuthContext } from '../Context/LoginHandlers'
import { Link } from 'react-router-dom'
import Logout from "./Logout"
import Sidebar from './Sidebar'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const{task,dispatched}=useContext(TaskContext)
  const [IsOpenModal,CloseModal] =useState(false)
  const[isEdit,setEdit] =useState(null)


  // fetch all tasks
  useEffect(()=>{
    const getTask =async()=>{
      try {
        const response =await axios.get("https://taskmanagement-zg03.onrender.com/task",{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
        })
      dispatched({type:"Set_Task",payload:response.data.task})

      } catch (error) {
        // console.log(error)
        if(error.response){
          toast.error(error.response.data.response)
        }

      }
    

    
    }
    getTask()
  },[dispatched])



  // onclick funnction to add task modal
  const OpenModal =()=>{
    CloseModal(!IsOpenModal)

  }

  // onclick function for update the edit modal
  const isEditModal =(taskId)=>{
    setEdit(taskId)

  }
  //function to click outside of the add and edit form
 let menuref =useRef()
  useEffect(()=>{
    const handler =(e)=>{
      if(!menuref.current.contains(e.target)){
               CloseModal(false)
      }

    }
document.addEventListener("mousedown",handler)
return ()=>{
  document.removeEventListener("mousedown",handler) 
}
  })

  // daashboard code
  return (
    <div className='border border-solid rounded-lg min-h-screen w-full bg-[#212121] border-stone-600  px-10  relative'>
     
      <div className='text-3xl capitalize py-10 flex justify-between '>
    
     <div className='flex   '>
    
     <div className='justify-center'><h2 className='pb-2'>tasks</h2>
        <div className='border border-solid border-[#028C6A]  w-16 h-0.5 '></div></div>
     </div>
        <div className='text-xl flex items-center justify-center border border-solid w-12 h-12 rounded-full px-3 py-2  hover:bg-[#028C6A]  hover:transition hover:duration-500 hover:ease-in-out'onClick={OpenModal} >+
    
        </div>
      </div>

   <div className=''>
   <div className='' ref={menuref}>  {IsOpenModal && <AddTask closeMenu={OpenModal} />}</div>
  
   <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 py-2 sm:gap-10 ">
        
        {task && task.length >0 &&task.map((er)=>{
         return<div className='border border-solid shadow-2xl bg-white    text-black rounded-lg'>
           <div className=''>
        {isEdit === er.id && <EditTask taskId={er.id} imageId={er.image.id} closeMenu={isEditModal}/>}
      </div>
        {er.image && (
            <div className="m-2">
              <img src={er.image.image_url} alt="Task" className="rounded-lg w-full h-56 object-cover object-center"  
              />
            </div>
          )}
      <div className='mx-3'>
        <h2 className='capitalize text-3xl'>{er.title}</h2>
         <p className='text-xl break-words'>{er.description}</p>
         <p className='py-2 text-lg'>{new Date(er.dueDate).toLocaleDateString()}</p>
      </div>
      <div className='flex justify-between mx-3 py-4 items-center'>
       <div> 
       {/* conditional rendering  */}
       {(er.status =="COMPLETE")?<button className='border border-solid px-4 py-2 rounded-full text-xl bg-green-800 text-white lowercase'>{er.status}</button>:(er.status =="IMPORTANT")?<button className='border border-solid px-4 py-2 rounded-full text-xl bg-blue-800 text-white lowercase'>{er.status}</button>:<button className='border border-solid px-4 py-2 rounded-full text-xl bg-red-800 text-white lowercase'>{er.status}</button>}</div>
       {/* end of conditional rendering */}
        
        {/* edit and the delete button */}
        <div className='px-1 flex'>
          <button className='text-xl px-1 ' onClick={()=>isEditModal(er.id)} ><i class="far fa-edit"></i></button>

          <DeleteTask taskId={er.id}/>
        </div>
      </div>
     
     </div>
        })}
        
     <div className='flex justify-center items-center border border-solid  border-black h-96  capitalize text-xl rounded-lg' onClick={OpenModal}><button>+ Add new task</button></div>
  </div>
 
   </div>

    </div>
 
  )
}

export default Dashboard