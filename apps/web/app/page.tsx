// app/page.tsx
import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';


export const metadata: Metadata = {
  title: 'TaskFlow - Organize Tasks, Boost Productivity',
  description: 'Streamline your workflow with our intuitive task management solution. Stay organized, meet deadlines, and achieve more together.',
  keywords: ['task management', 'productivity', 'workflow', 'organization'],
};

export default function HomePage() {
  return (
    <>
      {/* Main container */}
      <div className="min-h-screen bg-neutral-900">
        {/* Navigation */}
        <Navbar />
        
        {/* Main content */}
        <main className="relative h-fit">

          <Hero />
          
        </main>

      </div>
    </>
  );
}