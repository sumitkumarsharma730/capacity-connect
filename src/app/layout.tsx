import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

export const metadata: Metadata = {
  title: 'CAPACITY CONNECT | MoES & IMD Digital Capacity Building Portal',
  description: 'Centralized platform for organizational training, competency development, learning management, knowledge sharing, and scientific capacity building for the Ministry of Earth Sciences and India Meteorological Department.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900 bg-slate-50 min-h-screen">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
