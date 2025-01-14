import { Metadata } from 'next';
import ClientWrapper from '@/components/ClientWrapper';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'TaskFlow - Organize Tasks, Boost Productivity',
  description: 'Streamline your workflow with our intuitive task management solution. Stay organized, meet deadlines, and achieve more together.',
  keywords: ['task management', 'productivity', 'workflow', 'organization'],
};

export default function HomePage() {
  return (
    <ClientWrapper>
      <div className="min-h-screen bg-neutral-900">
        <main className="relative h-fit">
          <Hero />
        </main>
        <Footer />
      </div>
    </ClientWrapper>
  );
}