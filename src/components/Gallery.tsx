'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Calendar, User, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, formatDate, formatFileSize } from '@/lib/utils';
import type { UploadedFile, GalleryFilter } from '@/types';

interface GalleryProps {
  files: UploadedFile[];
  className?: string;
}

export function Gallery({ files, className }: GalleryProps) {
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [filter, setFilter] = useState<GalleryFilter>({ type: 'all' });

  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      if (filter.type !== 'all' && file.type !== filter.type) return false;
      if (filter.uploaderName && !file.uploaderName?.toLowerCase().includes(filter.uploaderName.toLowerCase())) return false;
      return true;
    });
  }, [files, filter]);

  const handleDownload = async (file: UploadedFile) => {
    try {
      const response = await fetch(file.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const FileCard = ({ file }: { file: UploadedFile }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="group relative aspect-square bg-accent rounded-lg overflow-hidden cursor-pointer"
      onClick={() => setSelectedFile(file)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {file.type === 'image' ? (
        <img
          src={file.url}
          alt={file.filename}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Play className="h-12 w-12 text-white" />
        </div>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      
      {/* Info overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
        <p className="text-white text-sm font-medium truncate">{file.filename}</p>
        {file.uploaderName && (
          <p className="text-white/80 text-xs">{file.uploaderName}</p>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant={filter.type === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter(prev => ({ ...prev, type: 'all' }))}
        >
          Tümü ({files.length})
        </Button>
        <Button
          variant={filter.type === 'image' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter(prev => ({ ...prev, type: 'image' }))}
        >
          Fotoğraflar ({files.filter(f => f.type === 'image').length})
        </Button>
        <Button
          variant={filter.type === 'video' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter(prev => ({ ...prev, type: 'video' }))}
        >
          Videolar ({files.filter(f => f.type === 'video').length})
        </Button>
      </div>

      {/* Gallery Grid */}
      <motion.div 
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <AnimatePresence>
          {filteredFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Henüz dosya yüklenmemiş.</p>
        </div>
      )}

      {/* File Preview Modal */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedFile(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-background rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-background/90 backdrop-blur-sm p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{selectedFile.filename}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {selectedFile.uploaderName && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {selectedFile.uploaderName}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(selectedFile.uploadedAt)}
                    </span>
                    <span>{formatFileSize(selectedFile.size)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(selectedFile)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="pt-20 pb-4 px-4">
                {selectedFile.type === 'image' ? (
                  <img
                    src={selectedFile.url}
                    alt={selectedFile.filename}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                ) : (
                  <video
                    src={selectedFile.url}
                    controls
                    className="w-full h-auto max-h-[70vh]"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}