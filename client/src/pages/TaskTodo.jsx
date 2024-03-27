import React, { useEffect, useState,useRef, useContext } from 'react'
import axios from"axios"
import DeleteTask from './DeleteTask'
import AddTask from './AddTask'
import EditTask from './EditTask'
import { TaskContext } from '../Context/TaskContext'
import Sidebar from './Sidebar'

const TaskImportant = () => {
  const{task,dispatched}=useContext(TaskContext)
  const [IsOpenModal,CloseModal] =useState(false)
  const[isEdit,setEdit] =useState(null)
  useEffect(()=>{
    const getTask =async()=>{
      try {
        const response =await axios.get("http://localhost:4000/task",{
          headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
        })
      dispatched({type:"Set_Task",payload:response.data.task})

      } catch (error) {
        // console.log(error)
        if(response.error){
          console.log(error.response)
        }

      }
    

    
    }
    getTask()
  },[dispatched])



  // onclick funnction to add task modal
  const OpenModal =()=>{
    CloseModal(!IsOpenModal)

  }

  // onclick function for updagte
  const isEditModal =(taskId)=>{
    setEdit(taskId)

  }
  // end of function update
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

  return (
    <div className='border border-solid rounded-lg min-h-screen bg-[#212121] border-stone-600  px-10 w-full '>
      <div className='text-3xl capitalize py-10 flex justify-between'>
      
     <div>
     <h2 className='pb-2 capitalize'>Todo tasks</h2>
        <div className='border border-solid border-green-600 w-16 h-0.5 '></div>
     </div>
        <div className='text-xl flex items-center justify-center border border-solid w-12 h-12 rounded-full px-3 py-2  hover:bg-blue-600 hover:transition hover:duration-500 hover:ease-in-out'onClick={OpenModal} >+
    
        </div>
      </div>
    
   <div className=''>
   <div className='' ref={menuref}>  {IsOpenModal && <AddTask closeMenu={OpenModal} />}</div>
  
   <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 py-2 sm:gap-10">
        
        {task && task.length >0 &&task.map((er)=>{
          if(er.status=="INCOMPLETE"){
            return (<div className='border border-solid shadow-2xl bg-white    text-black rounded-lg'>
            <div className=''>
         {/* {isEdit && <EditTask taskId={er.id} imageId={er.image.id} closeMenu={isEditModal}/>} */}
         {isEdit === er.id && <EditTask taskId={er.id} imageId={er.image.id} closeMenu={isEditModal}/>}
       </div>
         {er.image && (
             <div className="m-2">
               <img src={er.image.image_url} alt="Task" className="rounded-lg w-full h-56 object-cover object-center"  
               />
             </div>
           )}
       <div className='mx-3'>
         <h2 className='capitalize text-2xl'>{er.title}</h2>
          <p className='text-xl break-words'>{er.description}</p>
          <p className='py-2 text-lg'>{new Date(er.dueDate).toLocaleDateString()}</p>
       </div>
       <div className='flex justify-between mx-3 py-4 items-center'>
        <div> 
        {/* conditional rendering  */}
        <button className='border border-solid px-4 py-2 rounded-full text-xl bg-red-800 text-white lowercase'>{er.status}</button></div>
        {/* end of conditional rendering */}
         
         <div className='px-1 flex'>
           <button className='text-xl px-1 ' onClick={()=>isEditModal(er.id)} ><i class="far fa-edit"></i></button>
 
           <DeleteTask taskId={er.id}/>
         </div>
       </div>
      
      </div>
        )}
        
        })}
        
     <div className='flex justify-center items-center border border-solid  border-black h-96  capitalize text-xl rounded-lg' onClick={OpenModal}><button>+ Add new task</button></div>
  </div>
 
   </div>

    </div>
 
  )
}

export default TaskImportant