"use client"

import { useEffect, useState } from 'react'
import { Todo, TodoStatus } from '../types'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit2, Trash2, AlertCircle } from 'lucide-react'
import TodoForm from './TodoForm'
import TodoFilters from './TodoFilters'
import { useRouter } from 'next/navigation'

export default function TodoList() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([])
  const [filteredStatus, setFilteredStatus] = useState<TodoStatus | 'ALL'>('ALL')
  const [sortBy, setSortBy] = useState<'deadline' | 'created'>('deadline')

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3003/todo', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error('Failed to fetch todos')

        const todosData = await response.json()
        setTodos(todosData)
      } catch (error) {
      
        alert("Error retriving todos or the token expired!")
        router.push('/');
      }
    }

    fetchTodos()
  }, []) 

  

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this todo?')) return

    try {
      const token = localStorage.getItem('token')
      await fetch(`http://localhost:3003/todo/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleStatusChange = async (todo: Todo, newStatus: TodoStatus) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3003/todo/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error('Failed to update todo status')

      const updatedTodo = await response.json()
      setTodos(todos.map(t => t.id === todo.id ? updatedTodo : t))
    } catch (error) {
      console.error('Error updating todo status:', error)
    }
  }

  const handleUpdate = async (id: number, updatedData: Partial<Todo>) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3003/todo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) throw new Error('Failed to update todo')

      const updatedTodo = await response.json()
      setTodos(todos.map(t => t.id === id ? updatedTodo : t))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const handleSubmit = async (todoData: Omit<Todo, 'id'>) => {
    try {
      const token = localStorage.getItem('token')
      
      if ('id' in todoData) {
        // Update existing todo
        const response = await fetch(`http://localhost:3003/todo/${todoData.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(todoData),
        })
  
        if (!response.ok) throw new Error('Failed to update todo')
  
        const updatedTodo = await response.json()
        setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t))
      } else {
        // Create new todo
        const response = await fetch('http://localhost:3003/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(todoData),
        })
  
        if (!response.ok) throw new Error('Failed to create todo')
  
        const newTodo = await response.json()
        setTodos([...todos, newTodo])
      }
    } catch (error) {
      console.error('Error saving todo:', error)
    }
  }

  const filteredTodos = todos
  .filter(todo => filteredStatus === 'ALL' || todo.status === filteredStatus)
  .sort((a, b) => {
    if (sortBy === 'deadline') {
      // Add null checks and default dates
      const dateA = a.deadline ? new Date(a.deadline) : new Date(0);
      const dateB = b.deadline ? new Date(b.deadline) : new Date(0);
      return dateA.getTime() - dateB.getTime();
    }
    // Add null checks and default dates
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-black">Add New Todo</Button>
        </DialogTrigger>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Create New Todo</DialogTitle>
          </DialogHeader>
          <TodoForm onSubmit={handleSubmit} toUpdate={false}/>
        </DialogContent>
      </Dialog>

      <TodoFilters 
        onStatusFilter={setFilteredStatus}
        onSortChange={setSortBy}
      />

      <div className="space-y-4">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className=" bg-purple-500 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-start mb-4 justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold">{todo.task}</h3>
                <p className="text-white font-medium mt-1">
                  {todo.description}
                </p>
                <div className="mt-2 space-x-2">
                  {['ACTIVE', 'WORKING', 'DONE'].map((status) => (
                    <Button
                      key={status}
                      variant={todo.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(todo, status as TodoStatus)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Edit2 className=" h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='bg-white'>
                    <DialogHeader>
                      <DialogTitle>Edit Todo</DialogTitle>
                    </DialogHeader>
                    <TodoForm 
                      todo={todo}
                      onSubmit={handleSubmit}
                      toUpdate={true}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(todo.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 flex items-center text-lg font-semibold text-gray-500">
              <AlertCircle className="h-4 w-4 mr-1" />
              Deadline: {todo.deadline ? new Date(todo.deadline).toLocaleDateString() : 'No deadline set'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}