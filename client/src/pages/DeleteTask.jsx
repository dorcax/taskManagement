import React, { useContext, useState} from 'react'
import axios from "axios"
import { TaskContext } from '../Context/TaskContext'

const DeleteTask = ({taskId}) => {
const{dispatched} =useContext(TaskContext)

        const deleteTask =async()=>{
            try {
                const response =await axios.delete(`http://localhost:4000/task/${taskId}`,{
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem("token")}`
                    }
                })
                // setData(response.data)
                dispatched({type:"Delete_Task",payload:taskId})
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        // deleteTask()
  return (
    <div>
        <button className='text-xl px-1' onClick={deleteTask}><i class="fas fa-trash" ></i></button>
    </div>
  )
}

export default DeleteTask