
export const Todo = ({ task ,toggleComplete,deleteTodo, isUpdate}) => {

    return (
        <div className="todo">
            <p className={task.isComplete?'complete':""} onClick={()=>toggleComplete(task.id)}>{task.task}</p>
            <div className="btn">
                <button onClick={()=>isUpdate(task.id)}>update</button>
                <button onClick={()=>deleteTodo(task.id)}>delete</button>
            </div>

        </div>
    )
}