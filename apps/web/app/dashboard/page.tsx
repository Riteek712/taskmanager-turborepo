// apps/frontend/src/app/dashboard/page.tsx
import AuthCheck from '@/components/AuthCheck'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

export default function DashboardPage() {
  return (
    <AuthCheck>
      <div className="min-h-screen bg-black-800">
      <main className="container mx-auto max-w-4xl py-8 px-8">
        <h1 className="text-2xl font-bold mb-6 ">
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        Here is your task dashboard!
                </span>
          
        </h1>
        <div className="space-y-8">
          <TodoList />
        </div>
      </main>
    </div>
    </AuthCheck>
  )
}