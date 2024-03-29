import { React, useContext, useReducer, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios"
import { AuthContext } from "../Context/LoginHandlers";

const reducer =(state,action)=>{
  switch(action.type){
    case "Set_email":
      return{...state,email:action.payload}
    case "Set_password":
      return{...state,password:action.payload}
    case "RESET":
      return action.initialState
    default:
      return state
  }
}

const Login = () => {
  const{login,state} =useContext(AuthContext)
  const initialState={
    email:"",
    password:""
  }
  const [FORMDATA,dispatch ]=useReducer(reducer,initialState)

  // handle change function to updatee the name and the value
  const handleChange =(e)=>{
    const{name,value} =e.target
    console.log(name)
    dispatch({type:`Set_${name}`,payload:value})
  }



// ERROR VALIDATIO
const[error,setError] =useState([])
const validateForm =()=>{
  let valid =true
  let newError =[]

  if(!FORMDATA.email.trim()){
    newError.email ="please email is required"
    valid=false
  }else if(!/\S+@\S+\.\S+/.test(FORMDATA.email)){
    newError.email ="please provide a valid email"
    valid=false
  }
  if(!FORMDATA.password.trim()){
    newError.password ="please passwod is required"
    valid=false
  }else if(FORMDATA.password <6){
    newError.password="password must be more than 6"
    valid=false
  }
setError(newError)
return valid
}
const navigate =useNavigate()
  // handle submit
  const handleSubmit =async(e)=>{
    e.preventDefault()
    if(validateForm()){
      login(FORMDATA)
      dispatch({ type: "RESET", initialState });
      navigate("/")
    }
  }
  return (
    <div className='w-full min-h-screen flex justify-center items-center '>
      {/* lefthand side */}
      <div className="w-full  flex flex-col lg:flex-row items-center justify-center gap-28   ">
        <div className="flex items-center justify-center flex-col gap-6 py-6">
          <span className="border border-solid border-gray-300 rounded-full  px-2 py-1 text-xl sm:my-5 md:my-0">
            manage all your task in one place
          </span>
          <p className="flex flex-col gap-4 text-[#028C6A]  text-7xl capitalize font-bold items-center">
            <span>cloud based</span>
            <span className="pb-8">Task Manager</span>
            <span className="border border-solid bg-[#028C6A]  w-28 h-28 rounded-full animate-bounce  "></span>
          </p>
        </div>

        {/* form side */}
        <div className="border border-solid md:max-w-2xl sm:max-w-xl w-full  shadow-2xl bg-white flex flex-col justify-center  px-6 my-4">
          <div className="text-[#028C6A]  text-5xl  font-semibold py-5  text-center">
            <h2>Welcome back!</h2>
          </div>
          <form action="flex flex-col justify-center items-center"  onSubmit={handleSubmit}>
          
            
            
       
            <div className="my-4 py-4">
              <label htmlFor="email" className="capitalize text-black text-3xl  ">
                email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={FORMDATA.email}
                onChange={handleChange}
                className="w-full border border-solid rounded-full py-6 focus:outline-none px-4 text-black shadow-xl my-3 text-xl"
              />
              {error.email && <div className="text-red-600">{error.email}</div> }
            </div>

            <div className="my-4  py-4">
              <label htmlFor="password" className="capitalize text-black text-3xl">
                password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={FORMDATA.password}
                onChange={handleChange}
                className="w-full border border-solid rounded-full py-6 focus:outline-none px-4 text-black shadow-xl my-3 text-xl"
              />
              {error.password && <div className="text-red-600">{error.password}</div>}
            </div>
            <div className="bg-[#028C6A]   text-center py-3 rounded-full my-4 mx-10 text-white text-xl">
            
              <button type="submit" className="capitalize">
                sign In
              </button>
            </div>
            <p className="text-xl  text-black mt-2 text-center pb-4">
              Dont have an account ?
              <span className="text-[#028C6A]  capitalize text-lg">
                <Link to="/signup">signUp</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
