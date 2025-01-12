// apps/frontend/src/app/dashboard/page.tsx
import AuthCheck from '@/components/AuthCheck'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

export default function DashboardPage() {
  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto max-w-4xl py-8 px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Task Management
        </h1>
        <div className="space-y-8">
          <TodoList />
        </div>
      </main>
    </div>
    </AuthCheck>
  )
}