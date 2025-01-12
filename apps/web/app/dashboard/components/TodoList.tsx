// apps/frontend/src/app/dashboard/components/TodoList.tsx
"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getTodos } from '../api/todoApi'

interface Todo {
  id: number
  task: string
  description: string
  status: 'ACTIVE' | 'COMPLETED'
  createdAt: string
  updatedAt: string
  userEmail: string
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/auth/login')
          return
        }

        const todosData = await getTodos(token)
        setTodos(todosData)
      } catch (error) {
        console.error('Failed to fetch todos:', error)
        if (error instanceof Error && error.message.includes('unauthorized')) {
          router.push('/auth/login')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTodos()
  }, [router])

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-pulse">Loading todos...</div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>
  }

  if (todos.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        No todos yet. Start by creating a new task!
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      {todos.map((todo) => (
        <div 
          key={todo.id}
          className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`font-medium text-lg ${
                  todo.status === 'COMPLETED' ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
                }`}>
                  {todo.task}
                </h3>
                {todo.description && (
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {todo.description}
                  </p>
                )}
              </div>
              <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
                todo.status === 'ACTIVE' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {todo.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
              <span>Last updated: {new Date(todo.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}