import React from 'react'
import { useTodo} from '../contexts';
import { useState } from 'react';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
      e.preventDefault()
      if (!todo.trim()) return
      addTodo({todo: todo.trim(), completed: false})
      setTodo("")
    }

    return (
        <form onSubmit={add} className="flex flex-row gap-2 mb-6">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    className="w-full border-0 rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-sm sm:text-base outline-none transition-all duration-300 bg-white dark:bg-slate-700/50 shadow-lg focus:shadow-xl text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    autoFocus
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                    </svg>
                </div>
            </div>
            <button 
                type="submit" 
                className="flex-shrink-0 rounded-xl w-10 h-10 sm:w-auto sm:h-auto sm:px-6 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                disabled={!todo.trim()}
                aria-label="Add task"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 12H3"/>
                    <path d="M16 6H3"/>
                    <path d="M16 18H3"/>
                    <path d="M18 9v6"/>
                    <path d="M21 12h-6"/>
                </svg>
                <span className="hidden sm:inline">Add Task</span>
            </button>
        </form>
    );
}

export default TodoForm;

