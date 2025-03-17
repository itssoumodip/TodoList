import { useEffect, useState } from 'react'
import { TodoProvider } from '../contexts'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode")
    return savedMode ? JSON.parse(savedMode) : true
  })
  const [filter, setFilter] = useState('all')

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id != id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(t => t.completed).length
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className={`min-h-screen transition-colors duration-500 py-6 md:py-12 px-4 ${darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6 sm:mb-8 px-2">
            <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              <span className={`${darkMode 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'}`}>
                Taskify
              </span>
            </h1>
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
                darkMode 
                  ? 'bg-slate-700/50 text-yellow-300 hover:bg-slate-600/70' 
                  : 'bg-white/70 text-slate-700 hover:bg-white shadow-md'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
          
          <div className={`backdrop-blur-md shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ${
            darkMode 
              ? 'bg-slate-800/50 text-white border border-slate-700/50' 
              : 'bg-white/70 text-slate-800 border border-white/50'
          }`}>
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-700">
              <div 
                className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
              <TodoForm />
              
              {todos.length > 0 && (
                <div className="flex justify-center mb-5 sm:mb-6">
                  <div className={`inline-flex rounded-lg p-1 text-xs sm:text-sm ${darkMode ? 'bg-slate-700/50' : 'bg-slate-100'}`}>
                    {['all', 'active', 'completed'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 font-medium rounded-md capitalize transition-all ${
                          filter === tab
                            ? darkMode 
                              ? 'bg-slate-600 text-white' 
                              : 'bg-white text-slate-800 shadow-sm'
                            : darkMode
                              ? 'text-slate-300 hover:text-white'
                              : 'text-slate-600 hover:text-slate-800'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {todos.length === 0 ? (
                <div className="text-center py-10 sm:py-16">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 opacity-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0C9.58 3.068 9.33 3 9.068 3H6.75z" />
                    </svg>
                  </div>
                  <p className={`text-lg sm:text-xl font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    No tasks yet
                  </p>
                  <p className={`mt-2 text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Add a task to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {filteredTodos.map((todo) => (
                    <div key={todo.id} className="w-full transform transition-transform">
                      <TodoItem todo={todo} />
                    </div>
                  ))}
                  
                  <div className="pt-3 sm:pt-4 flex items-center justify-between text-xs sm:text-sm">
                    <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
                      {completedCount} of {todos.length} tasks completed
                    </span>
                    {completedCount > 0 && (
                      <button 
                        onClick={() => setTodos(prev => prev.filter(todo => !todo.completed))}
                        className={`px-2 sm:px-3 py-1 rounded-md text-xs ${
                          darkMode 
                            ? 'text-slate-300 hover:text-red-300 hover:bg-red-900/30' 
                            : 'text-slate-600 hover:text-red-700 hover:bg-red-50'
                        } transition-colors`}
                      >
                        Clear completed
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
