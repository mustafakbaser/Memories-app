'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, CheckCircle, Sparkles } from 'lucide-react';
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
    eventName: 'Esra & Mustafa',
    eventDate: '19 Eylül 2025',
    welcomeMessage: 'Düğün günümüzün anılarını bizimle paylaşın',
    subtitle: 'Çektiğiniz fotoğraf ve videoları yükleyerek özel günümüzün bir parçası olun'
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 relative">
      {/* Romantic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Hearts */}
        <motion.div
          animate={{ 
            y: [-20, -40, -20],
            x: [-10, 10, -10],
            rotate: [0, 10, 0] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 text-rose-300 opacity-30"
        >
          <Heart className="h-8 w-8" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [-30, -10, -30],
            x: [10, -10, 10],
            rotate: [0, -10, 0] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-32 text-pink-300 opacity-25"
        >
          <Heart className="h-6 w-6" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [-15, -35, -15],
            x: [-5, 15, -5],
            rotate: [0, 15, 0] 
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-32 text-purple-300 opacity-20"
        >
          <Sparkles className="h-7 w-7" />
        </motion.div>

        {/* Gradient Orbs */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-rose-200/30 to-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-purple-200/25 to-indigo-300/15 rounded-full blur-3xl" />
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed top-8 right-8 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20"
        >
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Başarıyla yüklendi! ✨</span>
        </motion.div>
      )}

      {/* Main Container */}
      <div className="h-full flex items-center justify-center p-6">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
            
            {/* Left Side - Event Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left space-y-8"
            >
              {/* Title */}
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex items-center justify-center lg:justify-start gap-3"
                >
                  <Heart className="h-8 w-8 text-rose-500 animate-pulse" />
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {eventConfig.eventName}
                  </h1>
                  <Heart className="h-8 w-8 text-rose-500 animate-pulse" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center lg:justify-start gap-3 text-lg text-gray-600"
                >
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold">{eventConfig.eventDate}</span>
                  {uploadedCount > 0 && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-pink-600 font-medium">{uploadedCount} anı paylaşıldı</span>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Welcome Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800">
                  {eventConfig.welcomeMessage}
                </h2>
                <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  {eventConfig.subtitle}
                </p>
              </motion.div>

              {/* Decorative Element */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="hidden lg:flex items-center gap-2 text-sm text-gray-500"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1" />
                <span>Özel anlarımızı paylaşalım</span>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1" />
              </motion.div>
            </motion.div>

            {/* Right Side - Upload */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl mb-4 shadow-lg"
                  >
                    <Heart className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Anılarınızı Paylaşın
                  </h3>
                  <p className="text-gray-600">
                    Düğün fotoğraf ve videolarınızı yükleyin
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
        </div>
      </div>

      {/* Bottom Signature */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
      >
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Heart className="h-3 w-3 text-rose-400" />
          <span>Tüm anılarınız güvenle saklanır</span>
          <Heart className="h-3 w-3 text-rose-400" />
        </div>
      </motion.div>
    </div>
  );
}