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
  title: 'Memories App - Düğün Fotoğraf Paylaşımı',
  description: 'Düğün anılarınızı kolayca paylaşın ve toplayın. Modern, güvenli ve kullanıcı dostu fotoğraf paylaşım platformu.',
  keywords: ['düğün', 'fotoğraf paylaşımı', 'anı toplama', 'event photography'],
  authors: [{ name: 'Memories App' }],
  openGraph: {
    title: 'Memories App - Düğün Fotoğraf Paylaşımı',
    description: 'Düğün anılarınızı kolayca paylaşın ve toplayın.',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memories App - Düğün Fotoğraf Paylaşımı',
    description: 'Düğün anılarınızı kolayca paylaşın ve toplayın.',
  },
  robots: {
    index: true,
    follow: true,
  },
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