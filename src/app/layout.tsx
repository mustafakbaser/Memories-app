import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Esra & M. Kürşad - Düğün Anıları',
  description: 'Düğün anılarınızı bizimle paylaşın. 19 Eylül 2025',
  keywords: ['düğün', 'fotoğraf paylaşımı', 'anı toplama', 'event photography'],
  authors: [{ name: 'Memories App' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
  themeColor: '#ec4899',
  openGraph: {
    title: 'Esra & M. Kürşad - Düğün Anıları',
    description: 'Düğün anılarınızı bizimle paylaşın.',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Esra & M. Kürşad - Düğün Anıları',
    description: 'Düğün anılarınızı bizimle paylaşın.',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ToastProvider>
          {children}
          <ToastViewport />
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}