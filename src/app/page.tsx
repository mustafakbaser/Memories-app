'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Sparkles, Stars } from 'lucide-react';
import { FileUpload } from '@/components/FileUpload';
import type { UploadedFile } from '@/types';

export default function HomePage() {
  const [uploadedCount, setUploadedCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUploadComplete = (newFiles: UploadedFile[]) => {
    setUploadedCount(prev => prev + newFiles.length);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const eventConfig = {
    eventName: 'Esra & M. Kürşad',
    eventDate: '19 Eylül 2025',
    welcomeMessage: 'Düğün günümüzün anılarını bizimle paylaşın',
    subtitle: 'Çektiğiniz özel anları yükleyerek mutluluğumuza ortak olun'
  };

  if (!mounted) return null;

  return (
    <div className="h-screen overflow-hidden relative bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff69b4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating Orbs with Glow */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"
        />

        {/* Animated Hearts Rain */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300/20"
            initial={{
              top: -50,
              left: `${Math.random() * 100}%`,
              rotate: 0
            }}
            animate={{
              top: '110%',
              rotate: 360,
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
          >
            <Heart className="h-8 w-8 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-white/95 backdrop-blur-xl px-8 py-4 rounded-full shadow-2xl border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Stars className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">Harika! Fotoğraflar yüklendi</p>
                  <p className="text-gray-600 text-sm">Anılarınız güvende</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="h-full flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >

            {/* Left Side - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left space-y-8"
            >
              {/* Decorative Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full border border-rose-200"
              >
                <Sparkles className="h-4 w-4 text-rose-500" />
                <span className="text-sm font-medium text-rose-700">Özel Gün</span>
              </motion.div>

              {/* Title with Gradient */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl lg:text-7xl font-bold"
                >
                  <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    {eventConfig.eventName}
                  </span>
                </motion.h1>

                {/* Date Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center lg:justify-start gap-3"
                >
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur rounded-full shadow-lg border border-purple-100">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    <span className="font-semibold text-gray-800">{eventConfig.eventDate}</span>
                  </div>
                  {uploadedCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-lg"
                    >
                      <span className="font-bold">{uploadedCount}</span> anı
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-2xl lg:text-3xl font-light text-gray-700 leading-relaxed">
                  {eventConfig.welcomeMessage}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {eventConfig.subtitle}
                </p>
              </motion.div>

              {/* Floating Hearts Decoration */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="hidden lg:flex items-center gap-4 pt-8"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [-5, -15, -5],
                      rotate: [-10, 10, -10]
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <Heart
                      className={`h-6 w-6 text-rose-${400 + i * 50} fill-current opacity-60`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Upload Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur-xl opacity-20 animate-pulse" />

                {/* Main Card */}
                <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/60">
                  {/* Card Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.6,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="inline-block"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-xl mb-4 mx-auto relative">
                        <Heart className="h-10 w-10 text-white" />
                        <motion.div
                          className="absolute inset-0 rounded-3xl bg-white/30"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0, 0.3, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        />
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Anıları Paylaş
                    </h3>
                    <p className="text-gray-600">
                      Özel anlarınızı kolayca yükleyin
                    </p>
                  </div>

                  {/* Upload Component */}
                  <FileUpload
                    onUploadComplete={handleUploadComplete}
                    maxFiles={20}
                    maxFileSize={100}
                    className="max-w-none"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}