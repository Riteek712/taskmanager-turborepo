// apps/frontend/src/app/dashboard/page.tsx
import AuthCheck from '@/components/AuthCheck'
import TodoList from './components/TodoList'

export default function DashboardPage() {
  return (
    <AuthCheck>
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 p-4">Your Todos</h1>
        <TodoList />
      </div>
    </AuthCheck>
  )
}