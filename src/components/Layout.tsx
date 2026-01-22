import { ReactNode } from 'react';
import Header from './Header';
import FloatingWidget from './FloatingWidget';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
      <FloatingWidget />
    </div>
  );
}
