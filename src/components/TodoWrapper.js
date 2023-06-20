import { useReducer } from "react"
import { TodoForm } from "./TodoForm"
import { Todo } from "./Todo"
import { EditTodo } from "./EditTodo"
import { v4 as uuidv4 } from "uuid"

export const TodoWrapper = () => {

    let initialState = []
    let reducer = (state, action) => {

        switch (action.type) {
            case 'add-task':
                if (action.payload) {
                    let Task = {
                        id: uuidv4(),
                        task: action.payload,
                        isComplete: false,
                        isEdited: false
                    }
                    return [...state, Task];
                }

            case 'markComple':
                return state.map(task => {
                    return task.id == action.payload ? { ...task, isComplete: !task.isComplete } : task;
                })

            case 'delete':
                return state.filter(task => task.id != action.payload)

            case 'isUpdate':
                return state.map(task => {
                    return task.id == action.payload ? { ...task, isEdited: !task.isEdited } : task
                })

            case 'edit':
                return state.map(task => {
                    return task.id === action.payload.id ? { ...task, isEdited: !task.isEdited, task: action.payload.task } : task
                })
            default:
                break;
        }

    }

    let [todos, todosDispatch] = useReducer(reducer, initialState)

    //mark complete or uncomplete the task
    const toggleComplete = (id) => {
        todosDispatch({ type: 'markComple', payload: id })
        let index = todos.findIndex(task => task.id == id)
        if (todos[index].isComplete == false) {
            let isCompletedTask = todos[index]
            todos.splice(index, 1)
            todos.push(isCompletedTask)
        }
    }

    //delete a todo
    const deleteTodo = id => {
        todosDispatch({ type: 'delete', payload: id })
    }

    //edit todo
    const editTodo = (id, task) => {
        console.log(id, task);
        todosDispatch({
            type: 'edit',
            payload: {
                id: id,
                task: task
            }
        })
    }
    const isUpdate = (id) => {
        console.log(id);
        todosDispatch({
            type: 'isUpdate',
            payload: id
        })
    }

    return (
        <div className="todoWrapper">
            <h1>ToDo</h1>
            <TodoForm todosDispatch={todosDispatch} />

            {/* show the todo list */}
            {todos.map(todo => {
                return (
                    todo.isEdited ?
                        (<EditTodo
                            editTodo={editTodo}
                            task={todo} />) :
                        (
                            <Todo
                                task={todo}
                                toggleComplete={toggleComplete}
                                deleteTodo={deleteTodo}
                                isUpdate={isUpdate}
                            />
                        )

                )
            })}
        </div>
    )
}