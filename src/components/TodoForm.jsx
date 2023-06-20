import { useReducer, useState } from "react"

export const TodoForm=({todosDispatch})=>{

    let reducer=(state,action)=>{
        return action
    }
    let initialState=''
    let [value,valueDispatch]=useReducer(reducer,initialState)
    let [error,setError]=useState('field cannot be empty')
    //handle form submition
    const handleSubmit=(e)=>{
        e.preventDefault()
         
        if(!isEmpty() ){
            todosDispatch({
                type:'add-task',
                payload:value
            })
            valueDispatch('')
        }
        
    }

    const inputFocus=()=>{
        if(value=='field cannot be empty')valueDispatch('')
        
    }

    //check is the input is empty or not
    const isEmpty = () => {
        if (!value || value == 'field cannot be empty') {
            valueDispatch('field cannot be empty')
            return true
        }else{
            return false
        }
    }
    let color={color:" "}
    color.color = value == 'field cannot be empty' ? 'red' : '';
    return (
            <form className="todoForm" onSubmit={handleSubmit} >
                
                <input type="text" style={color} value={value} onFocus={inputFocus} className="todo-input" placeholder="add task here" onChange={(e)=>{
                    if(value=='field cannot be empty')valueDispatch('')
                    valueDispatch(e.target.value)
                    
                }} />
                <button className="todo-btn" type="submit">Add task</button>
            </form>
    )
}