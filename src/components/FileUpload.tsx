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
      const uploadedFiles = await uploadFiles(selectedFiles);

      // Only call success if at least one file was uploaded successfully
      if (uploadedFiles.length > 0) {
        onUploadComplete?.(uploadedFiles);
        setSelectedFiles([]);
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
    <div className={cn('w-full space-y-4', className)}>

      {/* Drop Zone - Compact */}
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300',
          isDragActive
            ? 'border-pink-400 bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg transform scale-105'
            : 'border-gray-300 bg-gray-50/50 hover:border-pink-300 hover:bg-pink-50/50 hover:shadow-md',
          isUploading && 'pointer-events-none opacity-70'
        )}
      >
        <input {...getInputProps()} />
        <div className="space-y-3">
          <motion.div
            animate={{ 
              y: isDragActive ? -3 : 0,
              scale: isDragActive ? 1.05 : 1 
            }}
            className="mx-auto w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-md"
          >
            <Upload className="h-6 w-6 text-white" />
          </motion.div>
          
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-gray-800">
              {isDragActive ? 'Dosyaları bırakın' : 'Fotoğraf & Video Yükle'}
            </h4>
            <p className="text-sm text-gray-600">
              Sürükle-bırak veya <span className="text-pink-600 font-medium">dosya seç</span>
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-white/60 rounded-lg px-3 py-1.5">
            <span>Max {maxFiles} dosya</span>
            <span>•</span>
            <span>{maxFileSize}MB</span>
            <span>•</span>
            <span>JPG, PNG, MP4</span>
          </div>
        </div>
      </div>

      {/* Selected Files - Compact */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <h5 className="text-sm font-medium text-gray-700">Seçilen dosyalar ({selectedFiles.length})</h5>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-2.5 bg-white/80 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    {getFileIcon(file)}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate text-gray-800">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress - Compact */}
      <AnimatePresence>
        {uploads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {uploads.map((upload) => (
              <div key={upload.fileId} className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Yükleniyor...</span>
                  <span>{upload.progress}%</span>
                </div>
                <Progress value={upload.progress} className="h-1.5" />
                {upload.status === 'error' && (
                  <p className="text-xs text-red-500">{upload.error}</p>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Button - Elegant */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: selectedFiles.length > 0 ? 1 : 0.8,
          scale: selectedFiles.length > 0 ? 1 : 0.98 
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || isUploading}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl text-white font-semibold py-3 text-base rounded-xl transition-all duration-200"
          size="lg"
        >
          {isUploading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Yükleniyor...
            </div>
          ) : selectedFiles.length > 0 ? (
            `${selectedFiles.length} Dosyayı Yükle`
          ) : (
            'Önce Dosya Seçin'
          )}
        </Button>
      </motion.div>
    </div>
  );
}