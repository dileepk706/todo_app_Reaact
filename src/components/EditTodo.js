import { useReducer } from "react"

export const EditTodo = ({task,editTodo}) => {

    let [value,valueDispatch]=useReducer((state,action)=>{
        return action
    },task.task)
    const handleSubmit=e=>{
        e.preventDefault()
        editTodo(task.id,value)
        valueDispatch('')
    }
    return (
        <form className="todoForm" onSubmit={handleSubmit} >
            <input type="text" value={value} className="todo-input"   onChange={(e) => {
                valueDispatch(e.target.value)

            }} />
            <button className="todo-btn" type="submit">Update task</button>
        </form>
    )
}
 