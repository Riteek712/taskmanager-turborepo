import AuthCheck from '@/components/AuthCheck'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <AuthCheck>
      <div className="min-h-screen bg-neutral-900">
        <Navbar />
        {/* Added pt-20 to account for the fixed navbar height (h-16) plus some extra padding */}
        <main className="container mx-auto max-w-4xl px-4 pt-20">
          <h1 className="text-2xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              DASHBOARD
            </span>
          </h1>
          <div className="space-y-10">
            <TodoList />
          </div>
        </main>
      </div>
    </AuthCheck>
  )
}