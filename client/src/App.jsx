import React from 'react'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskTodo from './pages/TaskTodo'
import TaskImportant from "./pages/TaskImportant"
import Layout from "./pages/Layout"
import  {Authprovider} from "../src/Context/LoginHandlers"
import { TaskContextProvider } from './Context/TaskContext'
import ProtectedRoute from './pages/ProtectedRoute'



const App = () => {

  const router =createBrowserRouter(
    createRoutesFromElements(
      <Route>
 
        <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
        
          <Route path='/' index element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          {/* <Route path='task' element={<Task/>}/> */}
          <Route path='completed' element={<Task/>}/>
          <Route path='important' element={<TaskImportant/>}/>
          <Route path='todo' element={<TaskTodo/>}/> 
         
        
        </Route>
  
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
      </Route>
    )
  )
  return (
   <Authprovider>
     <TaskContextProvider>
     <RouterProvider router={router}/>
     <ToastContainer/>
     </TaskContextProvider>
  
      
   </Authprovider>
      
   
  )

}


export default App