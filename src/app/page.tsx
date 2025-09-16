'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Users, CheckCircle } from 'lucide-react';
import { FileUpload } from '@/components/FileUpload';
import type { UploadedFile } from '@/types';

export default function HomePage() {
  const [uploadedCount, setUploadedCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUploadComplete = (newFiles: UploadedFile[]) => {
    setUploadedCount(prev => prev + newFiles.length);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const eventConfig = {
    eventName: 'Esra & Mustafa Kürşad Düğünü',
    eventDate: '19 Eylül 2025',
    coupleNames: ['Esra', 'Mustafa Kürşad'],
    welcomeMessage: 'Özel günümüzün anılarını bizimle paylaşın! Çektiğiniz fotoğraf ve videoları yükleyerek bu güzel günü birlikte yaşayalım.',
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-rose-300/20 to-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-purple-300/20 to-indigo-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-yellow-300/10 to-orange-300/10 rounded-full blur-2xl" />
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-8 right-8 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Başarıyla yüklendi!</span>
        </motion.div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Heart className="h-8 w-8 text-rose-500 animate-pulse-soft" />
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {eventConfig.eventName}
                </h1>
                <Heart className="h-8 w-8 text-rose-500 animate-pulse-soft" />
              </div>
              
              <div className="flex items-center justify-center gap-8 text-muted-foreground flex-wrap">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <span className="text-lg font-medium">{eventConfig.eventDate}</span>
                </div>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {eventConfig.welcomeMessage}
              </p>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              {/* Upload Card */}
              <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 backdrop-blur-xl">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-4 shadow-lg"
                  >
                    <Heart className="h-10 w-10 text-white" />
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Anılarınızı Paylaşın
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Çektiğiniz fotoğraf ve videoları yükleyerek özel günümüzün bir parçası olun
                  </p>
                </div>

                <FileUpload
                  onUploadComplete={handleUploadComplete}
                  maxFiles={20}
                  maxFileSize={100}
                  className="max-w-none"
                />
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0 py-8 border-t border-white/10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="space-y-2"
            >
              <p className="text-muted-foreground">
                Tüm anılarınız güvenle saklanmaktadır
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/80">
                <Heart className="h-4 w-4 text-rose-400" />
                <span>© 2024 Memories App</span>
                <Heart className="h-4 w-4 text-rose-400" />
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
}