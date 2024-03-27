import React, { useContext, useEffect, useReducer, useRef } from "react";
import axios from "axios"
import { TaskContext } from "../Context/TaskContext";
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
const status ={
  INCOMPLETE:"INCOMPLETE",
  COMPLETE:"COMPLETE",
  IMPORTANT:"IMPORTANT"

}
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

  // handle submit of form
  
  const HandleSubmit =async(e)=>{
    e.preventDefault()
    
   
   
    const formData = new FormData();
    formData.append("title",state.title)

    formData.append("description",state.description)
    formData.append("image",state.image)
    formData.append("status",state.status)
    
    try {
     
      const response =await axios.post("http://localhost:4000/task",formData,
      {
        headers:{
          // "Content-Type": "multipart/form-data",
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatched({type:"Create_Task",payload:response.data})
      dispatch({type:"RESET",initialState})
      console.log("task created successfully")
      closeMenu()
    } catch (error) {
      console.log(error)
    }

  }

  // function to click outside of the form

  
  return (
    <div className="flex justify-center" >
        <div className="max-w-xl bg-white text-black  shadow-2xl absolute  w-full  rounded-lg  ">
      <div className="flex flex-col gap-5 p-10 ">
       <div className="flex justify-between items-center">
       <h2 className=" text-3xl capitalize">Create a task</h2>
   <div onClick={closeMenu}>     <i className="fas fa-times text-2xl" ></i></div>
       </div>
        
        <form action="" method="post" className=" text-xl" onSubmit={HandleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="title" className=" capitalize text-xl  py-2">
              title
            </label>
            <input
              type="text"
              name="title"
              id=""
              value={state.title}
              onChange={handleChange}
              className="w-full  h-14 rounded-lg bg-white shadow-2xl border border-solid mb-4 focus:outline-none px-4"
            />
          </div>
          <div>
            <label htmlFor="description" className=" capitalize text-xl  py-2">
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
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className=" capitalize text-xl py-2 ">upload file</label>
            <input
              type="file"
              name="image"
              id=""
              // value={image}
              onChange={handleFileChange}
              className="w-full bg-white shadow-2xl border border-solid  mb-4 py-2 rounded-lg"
            />
          </div>
          <div className="">
            <label htmlFor="status" className=" capitalize text-xl py-2  ">
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

              <option value={status.INCOMPLETE}>INCOMPLETE</option>

              <option value={status.COMPLETE}>COMPLETE</option>
              <option value={status.IMPORTANT}>IMPORTANT</option>
            </select>
          </div>

          <div className="flex justify-end items-center py-6 ">
            
            <button className="border border-solid bg-blue-800 px-2 py-3 rounded-lg text-white text-xl capitalize">
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
