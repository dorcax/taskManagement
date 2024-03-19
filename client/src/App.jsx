import React from 'react'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'
import Users from './pages/Users'
import Trash from './pages/Trash'
import TaskDetails from './pages/TaskDetails'

const App = () => {

  const router =createBrowserRouter(
    createRoutesFromElements(
      <Route>

        <Route element={<Layout/>}>
          <Route path='/' index element={<Dashboard/>}/>
          <Route path='task' element={<Task/>}/>
          <Route path='completed/:statusId' element={<Task/>}/>
          <Route path='in-progess/:statusId' element={<Task/>}/>
          <Route path='todo/:statusId' element={<Task/>}/>
          <Route path='team' element={<Users/>}/>
          <Route path='trash' element={<Trash/>}/>
          <Route path='task/:id' element={<TaskDetails/>}/>

        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
      </Route>
    )
  )
  return (
   
      <RouterProvider router={router}/>
      
   
  )
}

export default App