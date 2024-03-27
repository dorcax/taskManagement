import React from 'react'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'

import TaskTodo from './pages/TaskTodo'
import TaskImportant from "./pages/TaskImportant"
import Layout from "./pages/Layout"
import  {Authprovider} from "../src/Context/LoginHandlers"
import { TaskContextProvider } from './Context/TaskContext'
import ProtectedRoute from './pages/ProtectedRoute'
// import TaskImportant from './pages/TaskImportant'


const App = () => {
// const logged =window.localStorage.getItem("")
  const router =createBrowserRouter(
    createRoutesFromElements(
      <Route>
 
        <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
        
          <Route path='/' index element={<Dashboard/>}/>
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
     </TaskContextProvider>
  
      
   </Authprovider>
      
   
  )

}


export default App