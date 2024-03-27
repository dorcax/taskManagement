import React,{createContext, useReducer} from 'react'


const TaskContext =createContext()

const reducer=(state,action)=>{
    switch(action.type){
        case "Set_Task":
            return{
                task:action.payload
            }
        case "Create_Task":
            return{
                task:[action.payload,...state.task]
            }
        case "Update_Task":
            return {
                task:state.task.map(task=>task.id===action.payload.id? {...task,...action.payload}:task)}
        case "Delete_Task":
            return{
                task:state.task.filter(w=>w.id !== action.payload)
            }
        default:
            return state

        
    }
}
const TaskContextProvider = ({children}) => {
const initialState ={
    task:null
}
    const[state,dispatched] =useReducer(reducer,initialState)
  return (
    <TaskContext.Provider value={{...state,dispatched}}>
        {children}
    </TaskContext.Provider>
  )
}

export  {TaskContextProvider,TaskContext}