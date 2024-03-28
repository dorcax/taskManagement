import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import axios from "axios"
import { TaskContext } from "../Context/TaskContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// FUNCTION REDUCER
const reducer =(state,action)=>{
  switch(action.type){
    case "Set_TITLE":
      return{...state,title:action.payload}
    case"Set_DESCRIPTION":
      return{...state,description:action.payload}
    case"Set_IMAGE":
      return{...state,image:action.payload}
    case "Set_STATUS":
      return{...state,status:action.payload}
    case "RESET":{
      return action.initialState
      
    }
    default:
      return state
  
  }
}

// enum value
const status ={
  TODO:"TODO",
  COMPLETE:"COMPLETE",
  IMPORTANT:"IMPORTANT"

}

// add task component
const AddTask = ({closeMenu}) => {
  const initialState ={
    title:"",
    description:"",
    image:"",
    status:""
  }
const{dispatched}=useContext(TaskContext)
  const [state,dispatch] =useReducer(reducer,initialState)
  // handle chanage for all the input value
  const handleChange=(e)=>{
    const{name,value} =e.target
    dispatch({type:`Set_${name.toUpperCase()}`,payload:value})
  }
  // handle file change
  const handleFileChange =(e)=>{
    const file =e.target.files[0]
    dispatch({type:"Set_IMAGE",payload:file})
  }


  // validate task
  const[error,setError] =useState([])
  const validateTask =()=>{
    let newError =[]
    let valid =true

    if(!state.title.trim()){
      newError.title="please title is required"
      valid=false
    }
    if(!state.description.trim()){
      newError.description=" please description is required"
      valid=false
    }
    if(!state.image){
      newError.image =" please image is required"
      valid=false
    }
    if(!state.status){
      newError.status=" please status is required"
      valid=false
    }
    setError(newError)
    return valid 

  }
  // handle submit of form
  
  const HandleSubmit =async(e)=>{
    e.preventDefault()
    if(validateTask()){
  //  
  const formData = new FormData();
  formData.append("title",state.title)

  formData.append("description",state.description)
  formData.append("image",state.image)
 
  console.log("Form Data:", formData)
  for (const entry of formData.entries()) {
    console.log(entry[0] + ": " + entry[1]);
  }
   
   
   
    
    try {
      
  
      const response =await axios.post("https://taskmanagement-zg03.onrender.com/task/createtask", formData,


    
      {
        headers:{
          "Content-Type": "multipart/form-data",
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatched({type:"Create_Task",payload:response.data.task})
      console.log(response.data)
      dispatch({type:"RESET",initialState})
      toast.success("task created successfully")
      closeMenu()
    } catch (error) {
      // if(error.response){
      //   toast.error(error.response.data.msg)
      //   console.log(error.response.data.msg)
      // }
      if (error.response && error.response.data && error.response.data.msg) {
        // Check if msg is an object
        const errorMsg = typeof error.response.data.msg === 'object'
          ? JSON.stringify(error.response.data.msg) // stringify if it's an object
          : error.response.data.msg; // otherwise, use it as is

        toast.error(errorMsg);
        console.log("Error response:", error.response);
        console.log("Error message:", errorMsg);
      } else {
        // Handle other types of errors
        toast.error("An error occurred while creating the task.");
        console.log("Error:", error);
      }
    }
  }

  }

  // function to click outside of the form

  
  return (
    <div className="flex justify-center" >
        <div className="max-w-xl bg-white text-black  shadow-2xl absolute  w-full  rounded-lg  ">
      <div className="flex flex-col gap-5 p-10 ">
       <div className="flex justify-between items-center">
       <h2 className=" text-3xl capitalize">Create a task</h2>
  
       </div>
        
        <form action="flex flex-col " method="post" className=" text-2xl" onSubmit={HandleSubmit}>
          <div className=" my-2 py-2">
            <label htmlFor="title" className=" capitalize text-2xl  py-2">
              title
            </label>
            <input
              type="text"
              name="title"
              id=""
              value={state.title}
              onChange={handleChange}
              className="w-full  h-14 rounded-lg bg-white shadow-2xl border  border-solid mb-4 focus:outline-none px-4"
            />
             {error.title && <div className="text-red-600">{error.title}</div>}
          </div>
          <div className="
          my-2 py-2">
            <label htmlFor="description" className=" capitalize text-2xl  py-2">
              description
            </label>
            <input
              type="text"
              name="description"
              id=""
              value={state.description }
              onChange={handleChange}
              className="w-full bg-white shadow-2xl border border-solid h-28 rounded-lg my-4 focus:outline-none px-4"
            />
             {error.description && <div className="text-red-600">{error.description}</div>}
          </div>

          <div className="my-2 py-2">
            <label htmlFor="image" className=" capitalize text-2xl py-2 ">upload file</label>
            <input
              type="file"
              name="image"
              id=""
              // value={image}
              onChange={handleFileChange}
              className="w-full bg-white shadow-2xl border border-solid  mb-4 py-2 rounded-lg"
            />
             {error.image && <div className="text-red-600">{error.image}</div>}
          </div>
          <div className="my-2 py-2">
            <label htmlFor="status" className=" capitalize text-2xl py-2  ">
              task status
            </label>
            <select
              name="status"
              id=""
            
              value={state.status}
              onChange={handleChange}
              className="w-full  block appearance-none bg-white shadow-2xl border border-solid py-2 rounded-lg my-4 text-black focus:outline-none py-3 px-4 text-lg shadow-xl focus:shadow-outline"
            >
              <option value="">select your task status</option>

              <option value={status.TODO}>TODO</option>

              <option value={status.COMPLETE}>COMPLETE</option>
              <option value={status.IMPORTANT}>IMPORTANT</option>
            </select>
            {error.status && <div className="text-red-600">{error.status}</div>}
          </div>

          <div className="flex justify-end items-center py-4 ">
            
            <button className="border border-solid bg-[#028C6A]  px-2 py-3 rounded-lg text-white text-xl capitalize">
              + create A task
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  
  );
};

export default AddTask;



