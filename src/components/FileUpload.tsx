'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image, Video, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn, formatFileSize, isValidFileType } from '@/lib/utils';
import { useUpload } from '@/hooks/useUpload';
import type { UploadedFile } from '@/types';

interface FileUploadProps {
  onUploadComplete?: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  allowedFileTypes?: string[];
  className?: string;
}

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'video/mp4',
  'video/mov',
  'video/avi',
];

export function FileUpload({
  onUploadComplete,
  maxFiles = 10,
  maxFileSize = 50,
  allowedFileTypes = ALLOWED_FILE_TYPES,
  className,
}: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploaderInfo, setUploaderInfo] = useState({ name: '', email: '' });
  const { uploads, isUploading, uploadFiles } = useUpload();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      if (!isValidFileType(file, allowedFileTypes)) return false;
      if (file.size > maxFileSize * 1024 * 1024) return false;
      return true;
    });

    setSelectedFiles(prev => [...prev, ...validFiles].slice(0, maxFiles));
  }, [allowedFileTypes, maxFileSize, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.heic'],
      'video/*': ['.mp4', '.mov', '.avi'],
    },
    multiple: true,
    maxFiles,
  });

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      const uploadedFiles = await uploadFiles(selectedFiles, {
        name: uploaderInfo.name || 'Anonim',
        email: uploaderInfo.email || undefined,
      });

      // Only call success if at least one file was uploaded successfully
      if (uploadedFiles.length > 0) {
        onUploadComplete?.(uploadedFiles);
        setSelectedFiles([]);
        setUploaderInfo({ name: '', email: '' });
      } else {
        console.warn('No files were uploaded successfully');
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (file.type.startsWith('video/')) return <Video className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Uploader Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            Adınız (isteğe bağlı)
          </label>
          <input
            type="text"
            value={uploaderInfo.name}
            onChange={(e) => setUploaderInfo(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Adınızı girin"
            className="w-full px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">
            E-posta (isteğe bağlı)
          </label>
          <input
            type="email"
            value={uploaderInfo.email}
            onChange={(e) => setUploaderInfo(prev => ({ ...prev, email: e.target.value }))}
            placeholder="E-posta adresinizi girin"
            className="w-full px-4 py-3 border border-white/20 bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground text-foreground"
          />
        </div>
      </div>

      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95',
          isDragActive
            ? 'border-primary bg-gradient-to-br from-primary/10 to-purple-500/10 shadow-lg scale-105'
            : 'border-white/30 bg-white/5 hover:border-primary/50 hover:bg-white/10 hover:shadow-xl',
          isUploading && 'pointer-events-none opacity-50'
        )}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <motion.div
            animate={{ 
              y: isDragActive ? -5 : 0,
              scale: isDragActive ? 1.1 : 1 
            }}
            className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <Upload className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </motion.div>
          
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">
              {isDragActive ? 'Dosyaları buraya bırakın' : 'Fotoğraf ve Video Yükleyin'}
            </h3>
            <p className="text-muted-foreground">
              Dosyaları sürükleyip bırakın veya <span className="text-primary font-medium">buraya tıklayın</span>
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground bg-black/10 rounded-lg p-2">
            <span>Max {maxFiles} dosya</span>
            <span>•</span>
            <span>{maxFileSize}MB'a kadar</span>
            <span>•</span>
            <span>JPG, PNG, MP4</span>
          </div>
        </div>
      </div>

      {/* Selected Files */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <h4 className="font-medium">Seçilen dosyalar ({selectedFiles.length})</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-3 bg-accent rounded-lg"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {getFileIcon(file)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <h4 className="font-medium">Yükleme durumu</h4>
            {uploads.map((upload) => (
              <div key={upload.fileId} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Yükleniyor...</span>
                  <span>{upload.progress}%</span>
                </div>
                <Progress value={upload.progress} className="h-2" />
                {upload.status === 'error' && (
                  <p className="text-sm text-red-500">{upload.error}</p>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: selectedFiles.length > 0 ? 1 : 0.7,
          scale: selectedFiles.length > 0 ? 1 : 0.95 
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || isUploading}
          className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl text-white font-semibold py-4 text-lg"
          size="lg"
        >
          {isUploading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Yükleniyor...
            </div>
          ) : selectedFiles.length > 0 ? (
            `${selectedFiles.length} dosyayı yükle`
          ) : (
            'Dosya seçin'
          )}
        </Button>
      </motion.div>
    </div>
  );
}