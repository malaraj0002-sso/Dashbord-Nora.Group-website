import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { AdminDataProvider } from '@/lib/AdminDataContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Nora Group — Luxury Carpentry Admin',
  description: 'Administrative dashboard for Nora Group Luxury Carpentry & Architecture Woodwork',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground`}>
        <AdminDataProvider>{children}</AdminDataProvider>
      </body>
    </html>
  );
}
