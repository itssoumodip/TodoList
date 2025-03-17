import React from 'react'
import { useTodo } from '../contexts';
import { useState } from 'react';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const {updateTodo, deleteTodo, toggleComplete} = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, {...todo, todo: todoMsg})
        setIsTodoEditable(false)
    }
    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

    return (
        <div
            className={`group flex items-center rounded-xl px-4 py-3.5 gap-4 shadow-lg transition-all duration-500 ${
                todo.completed 
                  ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-900/30" 
                  : "bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-100 dark:border-violet-900/30"
            } hover:shadow-xl`}
        >
            <div onClick={toggleCompleted} className="cursor-pointer">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center border-2 transition-all ${
                    todo.completed 
                        ? "border-green-500 bg-green-500 dark:border-green-400 dark:bg-green-400" 
                        : "border-slate-400 dark:border-slate-500 group-hover:border-violet-500 dark:group-hover:border-violet-400"
                }`}>
                    {todo.completed && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
            </div>
            
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg py-1.5 px-2 transition-all ${
                    isTodoEditable 
                        ? "border-blue-400 dark:border-blue-500" 
                        : "border-transparent focus:border-transparent"
                } ${
                    todo.completed 
                        ? "line-through text-gray-500 dark:text-gray-400" 
                        : "text-gray-800 dark:text-white"
                } focus:outline-none`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            
            <div className="flex items-center gap-2 ml-auto">
                <button
                    className={`flex-shrink-0 w-9 h-9 rounded-lg justify-center items-center transition-all duration-200 ${
                        todo.completed 
                            ? "text-gray-400 cursor-not-allowed opacity-50" 
                            : isTodoEditable 
                                ? "inline-flex bg-blue-500 text-white hover:bg-blue-600" 
                                : "inline-flex bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-600"
                    } border border-transparent ${isTodoEditable ? "border-blue-600 dark:border-blue-500" : ""}`}
                    onClick={() => {
                        if (todo.completed) return;
                        if (isTodoEditable) {
                            editTodo();
                        } else setIsTodoEditable((prev) => !prev);
                    }}
                    disabled={todo.completed}
                    aria-label={isTodoEditable ? "Save todo" : "Edit todo"}
                >
                    {isTodoEditable ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                            <polyline points="17 21 17 13 7 13 7 21" />
                            <polyline points="7 3 7 8 15 8" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                    )}
                </button>
                
                <button
                    className="flex-shrink-0 w-9 h-9 rounded-lg inline-flex justify-center items-center bg-white dark:bg-slate-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                    onClick={() => deleteTodo(todo.id)}
                    aria-label="Delete todo"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default TodoItem;
