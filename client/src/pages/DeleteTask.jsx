import React, { useContext, useState} from 'react'
import axios from "axios"
import { TaskContext } from '../Context/TaskContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DeleteTask = ({taskId}) => {
const{dispatched} =useContext(TaskContext)

        const deleteTask =async()=>{
            try {
                const response =await axios.delete(`https://taskmanagement-zg03.onrender.com/task/${taskId}`,{
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem("token")}`
                    }
                })
                // setData(response.data)
                dispatched({type:"Delete_Task",payload:taskId})
                toast.success("task has been deleted")
            } catch (error) {
                if(error.response){
                    toast.error(error.response.data.msg)
                }

            }
        }
        // deleteTask()
  return (
    <div>
        <button className='text-2xl px-1' onClick={deleteTask}><i class="fas fa-trash" ></i></button>
    </div>
  )
}

export default DeleteTask