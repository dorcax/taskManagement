import { React, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name:action.payload };
    case "SET_EMAIL":
      return { ...state, email:action.payload };
    case "SET_PASSWORD":
      return { ...state, password:action.payload };
    case "RESET":
        return action.initialState;
    default:
      return state;
  }
};
const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // handle change function updates the state based on the input field's name and value
  const handleChange = (e) => {
    const { name, value } = e.target;
    // dispatch({ type: name, payload: value });
    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  };

  // catching the error messages
const[error,setError] =useState([])
const validateForm =()=>{
  let valid =true
  const newError =[]

  if(!state.name.trim()){
    newError.name="please name is required"
    valid=false
    }
    if(!state.email.trim()){
      newError.email="please email is required"
      valid=false
    }else if (!/\S+@\S+\.\S+/.test(state.email)) {
      newError.email ="Email is invalid";
      valid = false;
    
}
if(!state.password.trim()){
  newError.password ="please password is required"
  valid =false
}else if(state.password.length <6) {
  newError.password="password must be more than 6"
  valid=false
}
setError(newError)

return valid
}
  // handle submit function for form submission
  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(validateForm()){
      try {
        const response =await axios.post("http://localhost:4000/user",{
          name:state.name,
          email:state.email,
          password:state.password
        })
        console.log("user successfully created",response)
        // dispatch({type:"RESET",payload:initialState})
      } catch (error) {
        if(error.response){
          console.log(error.response.data.msg)
        }
      }
    }

  }
  return (
    <div className='w-full min-h-screen flex justify-center items-center   '>
      {/* lefthand side */}
      <div className="w-full  flex  items-center justify-center gap-28   ">
        <div className="flex items-center justify-center flex-col gap-6">
          <span className="border border-solid border-gray-300 rounded-full  px-2 py-2 text-lg">
            manage all your task in one place
          </span>
          <p className="flex flex-col gap-3 text-blue-800 text-7xl capitalize font-bold items-center ">
            <span>cloud based</span>
            <span className="pb-8">Task Manager</span>
            <span className="border border-solid bg-blue-800 w-28 h-28 rounded-full animate-bounce  "></span>
          </p>
        </div>

        {/* form side */}
        <div className="border border-solid max-w-lg w-full shadow-2xl bg-white flex flex-col justify-center px-6 ">
          <div className="text-blue-800 text-5xl  font-semibold py-4 text-center">
            <h2>Welcome !!!!</h2>
          </div>
          <form action="flex flex-col justify-center items-center" onSubmit={handleSubmit} >
            <div
              className="
    "
            >
            
              <label
                htmlFor="name"
                className="
              capitalize text-black text-2xl "
              >
                username
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={state.name}
                onChange={handleChange}
                className="w-full border border-solid rounded-full py-5 focus:outline-none px-4 shadow-xl text-black my-3"
              
              />
                {error.name && <p className="text-red-600">{error.name}</p>}
            </div>
            <div className="">
              <label htmlFor="email" className="capitalize text-black text-2xl ">
                email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={state.email}
                onChange={handleChange}
                className="w-full border border-solid rounded-full py-5 focus:outline-none px-4 shadow-xl  text-black my-3"/>
              {error.email && <div className="text-red-600">{error.email}</div> }
            </div>

            <div className=" ">
              <label htmlFor="password" className="capitalize text-black text-2xl">
                password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={state.password}
                onChange={handleChange}
                className="w-full border border-solid rounded-full py-5 focus:outline-none px-4 shadow-xl  text-black my-3"
              />
              {error.password && <div className="text-red-600">{error.password}</div>}
            </div>
            <div className="bg-blue-800  mx-auto text-center py-3 rounded-full my-4  mx-5 text-white text-sm">
            
              <button type="submit" className="capitalize text-xl">
                sigin Up
              </button>
            </div>
            <p className="
        text-xl text-black  text-center pb-4">Have an account ? <span className="text-blue-600  text-md"><Link to="/login">Sign in</Link></span></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
